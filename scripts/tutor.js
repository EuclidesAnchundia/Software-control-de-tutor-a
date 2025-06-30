document.addEventListener("DOMContentLoaded", () => {
  const estudiantes = [
    {
      nombre: "María González",
      carrera: "Sistemas",
      correo: "maria@estudiantes.uleam.edu.ec",
      tutor: "Dr. Carlos Mendez",
      progreso: 85,
      semestre: "Octavo",
      entregas: [
        { titulo: "Propuesta", estado: "Aprobado", comentario: "Excelente propuesta." },
        { titulo: "Capítulo 1", estado: "Aprobado", comentario: "Revisar referencias." }
      ],
      sesiones: [
        { fecha: "2025-06-05", motivo: "Capítulo 2", estado: "aceptada", observaciones: "Confirmada por estudiante." }
      ]
    },
    {
      nombre: "Carlos Mendoza",
      carrera: "Sistemas",
      correo: "carlos@estudiantes.uleam.edu.ec",
      tutor: "Dr. Carlos Mendez",
      progreso: 40,
      semestre: "Octavo",
      entregas: [
        { titulo: "Propuesta", estado: "Pendiente", comentario: "Esperando revisión." }
      ],
      sesiones: [
        { fecha: "2025-06-08", motivo: "Propuesta", estado: "pendiente", observaciones: "Esperando confirmación." }
      ]
    }
  ];

  const lista = document.getElementById("lista-estudiantes");
  const detalleBox = document.getElementById("detalle-estudiante");
  const vistaLista = document.getElementById("vista-lista");
  const vistaDetalle = document.getElementById("vista-detalle");
  const volverBtn = document.getElementById("volver");
  const listaSolicitudes = document.getElementById("lista-solicitudes");

  function cargarSolicitudes() {
    listaSolicitudes.innerHTML = "";
    const solicitudes = JSON.parse(localStorage.getItem("sesionesSolicitadas") || "[]");
    solicitudes.forEach((s, i) => {
      const div = document.createElement("div");
      div.classList.add("sesion-card");
      div.innerHTML = `
        <p><strong>${s.estudiante}</strong></p>
        <p><strong>Fecha:</strong> ${s.fecha}</p>
        <p><strong>Motivo:</strong> ${s.motivo}</p>
        <div class="acciones">
          <button class="aceptar">Aceptar</button>
          <button class="rechazar">Rechazar</button>
        </div>
      `;
      div.querySelector(".aceptar").addEventListener("click", () => gestionarSolicitud(i));
      div.querySelector(".rechazar").addEventListener("click", () => gestionarSolicitud(i));
      listaSolicitudes.appendChild(div);
    });
  }

  function gestionarSolicitud(index) {
    const solicitudes = JSON.parse(localStorage.getItem("sesionesSolicitadas") || "[]");
    solicitudes.splice(index, 1);
    localStorage.setItem("sesionesSolicitadas", JSON.stringify(solicitudes));
    cargarSolicitudes();
  }

  cargarSolicitudes();

  estudiantes.forEach(est => {
    const card = document.createElement("div");
    card.classList.add("tarjeta");
    card.innerHTML = `
      <h3>${est.nombre}</h3>
      <p>${est.carrera} - ${est.semestre}</p>
      <div class="progress"><div class="progress-bar" style="width:${est.progreso}%"></div></div>
    `;
    card.addEventListener("click", () => {
      mostrarDetalle(est);
      vistaLista.classList.add("oculto");
      vistaDetalle.classList.remove("oculto");
    });
    lista.appendChild(card);
  });

  volverBtn.addEventListener("click", () => {
    vistaDetalle.classList.add("oculto");
    vistaLista.classList.remove("oculto");
  });

  function mostrarDetalle(est) {
    let estado = "verde";
    if (est.progreso < 80) estado = "amarillo";
    if (est.progreso < 50) estado = "rojo";

    detalleBox.innerHTML = `
      <h3>${est.nombre}</h3>
      <p><strong>Carrera:</strong> ${est.carrera}</p>
      <p><strong>Correo:</strong> ${est.correo}</p>
      <p><strong>Semestre:</strong> ${est.semestre}</p>
      <p><strong>Tutor:</strong> ${est.tutor}</p>
      <div class="estado ${estado}">Estado: ${estado.toUpperCase()}</div>
      <p><strong>Progreso:</strong> ${est.progreso}%</p>
      <div class="progress"><div class="progress-bar" style="width:${est.progreso}%"></div></div>

      <h4>Entregas</h4>
      ${est.entregas.map(e => `
        <div class="entrega-card">
          <p><strong>${e.titulo}</strong> (${e.estado})</p>
          <p>${e.comentario}</p>
        </div>
      `).join("")}

      <h4>Sesiones Solicitadas</h4>
      ${est.sesiones.map(s => `
        <div class="sesion-card">
          <p><strong>Fecha:</strong> ${s.fecha}</p>
          <p><strong>Motivo:</strong> ${s.motivo}</p>
          <p><strong>Observaciones:</strong> ${s.observaciones}</p>
          <p><strong>Estado:</strong> ${s.estado}</p>
        </div>
      `).join("")}

      <form id="form-sesion">
        <label for="motivo">Motivo de la sesión:</label>
        <input type="text" id="motivo" required />

        <label for="fecha">Fecha propuesta:</label>
        <input type="date" id="fecha" required />

        <label for="obs">Observaciones:</label>
        <textarea id="obs" rows="3"></textarea>

        <span class="error" id="error-msg"></span>
        <span class="success" id="ok-msg"></span>
        <button type="submit">Solicitar sesión</button>
      </form>
    `;

    document.getElementById("form-sesion").addEventListener("submit", e => {
      e.preventDefault();
      const motivo = document.getElementById("motivo").value.trim();
      const fecha = document.getElementById("fecha").value;
      const error = document.getElementById("error-msg");
      const ok = document.getElementById("ok-msg");
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

      ok.textContent = "Sesión solicitada correctamente.";
      e.target.reset();
    });
  }
});
