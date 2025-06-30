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

  // Sesiones solicitadas por el estudiante
  const listaSesiones = document.getElementById("lista-sesiones");

  function cargarSesiones() {
    const todas = JSON.parse(localStorage.getItem("sesiones")) || [];
    const mias = todas.filter(s => s.estudiante === estudiante.nombre);
    listaSesiones.innerHTML = "";
    mias.forEach(s => {
      const div = document.createElement("div");
      div.classList.add("sesion-card");
      div.innerHTML = `
        <p><strong>Fecha:</strong> ${s.fecha}</p>
        <p><strong>Motivo:</strong> ${s.motivo}</p>
        <p><strong>Estado:</strong> ${s.estado}</p>
      `;
      listaSesiones.appendChild(div);
    });
  }

  cargarSesiones();

  document.getElementById("form-sesion").addEventListener("submit", e => {
    e.preventDefault();
    const motivo = document.getElementById("motivo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const error = document.getElementById("error-sesion");
    const ok = document.getElementById("ok-sesion");
    error.textContent = "";
    ok.textContent = "";

    if (!motivo || !fecha) {
      error.textContent = "Todos los campos son obligatorios.";
      return;
    }

    const fechaHoy = new Date().toISOString().split("T")[0];
    if (fecha < fechaHoy) {
      error.textContent = "La fecha debe ser hoy o futura.";
      return;
    }

    const sesiones = JSON.parse(localStorage.getItem("sesiones")) || [];
    sesiones.push({
      id: Date.now(),
      estudiante: estudiante.nombre,
      motivo,
      fecha,
      estado: "pendiente"
    });
    localStorage.setItem("sesiones", JSON.stringify(sesiones));
    ok.textContent = "Sesión solicitada.";
    e.target.reset();
    cargarSesiones();
  });
});
