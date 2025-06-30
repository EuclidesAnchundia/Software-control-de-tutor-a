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
      ]
    }
  ];

  const lista = document.getElementById("lista-estudiantes");
  const detalleBox = document.getElementById("detalle-estudiante");
  const vistaLista = document.getElementById("vista-lista");
  const vistaDetalle = document.getElementById("vista-detalle");
  const volverBtn = document.getElementById("volver");

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

      <h4>Solicitudes de Sesión</h4>
      ${obtenerSesiones(est.nombre).map(s => `
        <div class="sesion-card" data-id="${s.id}">
          <p><strong>Fecha:</strong> ${s.fecha}</p>
          <p><strong>Motivo:</strong> ${s.motivo}</p>
          <p><strong>Estado:</strong> ${s.estado}</p>
          ${s.estado === 'pendiente' ? `<div class="acciones"><button class="aceptar">Aceptar</button><button class="rechazar">Rechazar</button></div>` : ''}
        </div>
      `).join("")}
    `;

    detalleBox.querySelectorAll('.aceptar').forEach(btn => {
      btn.addEventListener('click', () => actualizarSesion(btn.closest('.sesion-card').dataset.id, 'aceptada', est));
    });
    detalleBox.querySelectorAll('.rechazar').forEach(btn => {
      btn.addEventListener('click', () => actualizarSesion(btn.closest('.sesion-card').dataset.id, 'rechazada', est));
    });
  }

  function obtenerSesiones(nombre) {
    const sesiones = JSON.parse(localStorage.getItem('sesiones')) || [];
    return sesiones.filter(s => s.estudiante === nombre);
  }

  function actualizarSesion(id, estado, est) {
    const sesiones = JSON.parse(localStorage.getItem('sesiones')) || [];
    const ses = sesiones.find(s => s.id == id);
    if (ses) {
      ses.estado = estado;
      localStorage.setItem('sesiones', JSON.stringify(sesiones));
    }
    mostrarDetalle(est);
  }
});
