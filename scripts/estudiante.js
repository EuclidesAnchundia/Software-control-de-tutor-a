document.addEventListener("DOMContentLoaded", () => {
  const estudiante = {
    nombre: "María González",
    carrera: "Ingeniería en Sistemas",
    semestre: "Octavo",
    correo: "maria.gonzalez@live.uleam.edu.ec",
    tutor: "Dr. Carlos Mendez",
    entregas: [
      { titulo: "Propuesta de Tesis", estado: "Aprobado", fecha: "2023-11-28", comentario: "Excelente propuesta." },
      { titulo: "Capítulo 1 - Marco Teórico", estado: "Aprobado", fecha: "2024-01-12", comentario: "Buen trabajo. Revisión de referencias." }
    ]
  };

  const info = document.getElementById("info-estudiante");
  const lista = document.getElementById("lista-entregas");
  const barra = document.getElementById("barra-progreso");
  const completadas = document.getElementById("entregas-hechas");
  const totales = document.getElementById("entregas-totales");
  const proxima = document.getElementById("proxima-entrega");

  // Mostrar datos
  info.innerHTML = `
    <p><strong>Estudiante:</strong> ${estudiante.nombre}</p>
    <p><strong>Carrera:</strong> ${estudiante.carrera}</p>
    <p><strong>Semestre:</strong> ${estudiante.semestre}</p>
    <p><strong>Email:</strong> ${estudiante.correo}</p>
    <p><strong>Tutor Asignado:</strong> ${estudiante.tutor}</p>
  `;

  // Entregas
  estudiante.entregas.forEach(e => {
    const div = document.createElement("div");
    div.classList.add("entrega-card");
    div.innerHTML = `
      <p><strong>${e.titulo}</strong> <span class="estado">(${e.estado})</span></p>
      <p><small>Entregado: ${e.fecha}</small></p>
      <p><em>Comentarios del tutor:</em> ${e.comentario}</p>
    `;
    lista.appendChild(div);
  });

  // Progreso
  const entregasCompletadas = estudiante.entregas.length;
  const totalEntregas = 4;
  const porcentaje = (entregasCompletadas / totalEntregas) * 100;

  barra.style.width = `${porcentaje}%`;
  completadas.textContent = entregasCompletadas;
  totales.textContent = totalEntregas;
  proxima.textContent = "15 Feb"; // Simulado

  // Subida de entregas
  document.getElementById("form-subir").addEventListener("submit", e => {
    e.preventDefault();
    const archivo = document.getElementById("archivo").value;
    const error = document.getElementById("error-subir");
    const ok = document.getElementById("ok-subir");
    error.textContent = "";
    ok.textContent = "";

    if (!archivo) {
      error.textContent = "Debe seleccionar un archivo.";
      return;
    }

    ok.textContent = "Entrega subida exitosamente.";
    e.target.reset();
  });

  // Consulta al tutor
  document.getElementById("form-consulta").addEventListener("submit", e => {
    e.preventDefault();
    const mensaje = document.getElementById("mensaje").value.trim();
    const error = document.getElementById("error-consulta");
    const ok = document.getElementById("ok-consulta");

    error.textContent = "";
    ok.textContent = "";

    if (!mensaje) {
      error.textContent = "Escriba una consulta antes de enviar.";
      return;
    }

    ok.textContent = "Consulta enviada correctamente.";
    e.target.reset();
  });

  // Solicitar nueva sesión
  document.getElementById("form-sesion-est").addEventListener("submit", e => {
    e.preventDefault();
    const fecha = document.getElementById("fecha-sesion").value;
    const motivo = document.getElementById("motivo-sesion").value.trim();
    const error = document.getElementById("error-sesion");
    const ok = document.getElementById("ok-sesion");
    error.textContent = "";
    ok.textContent = "";

    if (!fecha || !motivo) {
      error.textContent = "Complete todos los campos.";
      return;
    }

    const solicitudes = JSON.parse(localStorage.getItem("sesionesSolicitadas") || "[]");
    solicitudes.push({ estudiante: estudiante.nombre, fecha, motivo });
    localStorage.setItem("sesionesSolicitadas", JSON.stringify(solicitudes));
    ok.textContent = "Sesión solicitada.";
    e.target.reset();
  });

  // Sesiones solicitadas
  const sesiones = [
    {
      fecha: "2025-06-05",
      motivo: "Revisión del capítulo 2",
      observaciones: "Por favor, confirmar asistencia antes del viernes."
    }
  ];

  const listaSesiones = document.getElementById("lista-sesiones");

  sesiones.forEach((s, i) => {
    const div = document.createElement("div");
    div.classList.add("sesion-card");
    div.innerHTML = `
      <p><strong>Fecha:</strong> ${s.fecha}</p>
      <p><strong>Motivo:</strong> ${s.motivo}</p>
      <p><strong>Observaciones:</strong> ${s.observaciones}</p>
      <div class="acciones">
        <button class="aceptar">Aceptar</button>
        <button class="rechazar">Rechazar</button>
      </div>
      <div class="confirmacion" id="conf-${i}"></div>
    `;

    div.querySelector(".aceptar").addEventListener("click", () => {
      confirmarSesion(i, "aceptada");
    });

    div.querySelector(".rechazar").addEventListener("click", () => {
      confirmarSesion(i, "rechazada");
    });

    listaSesiones.appendChild(div);
  });

  function confirmarSesion(index, estado) {
    const div = document.getElementById(`conf-${index}`);
    div.textContent = `Sesión ${estado} correctamente.`;
    setTimeout(() => {
      div.parentElement.remove();
    }, 2000);
  }
});
