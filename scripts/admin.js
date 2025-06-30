document.addEventListener("DOMContentLoaded", function () {
  const estudiantes = [
    { nombre: "Juan Pérez", carrera: "Sistemas", departamento: "Base de Datos", tutor: null, facultad: "Ingeniería" },
    { nombre: "Ana Ríos", carrera: "Sistemas", departamento: "Matemáticas", tutor: "Mg. Torres", facultad: "Ingeniería" },
    { nombre: "Mario López", carrera: "Finanzas", departamento: "Finanzas", tutor: null, facultad: "Contabilidad" },
  ];

  const tutores = [
    { nombre: "Mg. Torres", departamento: "Base de Datos", asignados: 1, facultad: "Ingeniería" },
    { nombre: "Ing. Ramírez", departamento: "Matemáticas", asignados: 0, facultad: "Ingeniería" },
    { nombre: "Lcda. Delgado", departamento: "Finanzas", asignados: 2, facultad: "Contabilidad" },
  ];

  const usuarios = [
    { nombre: "Juan Pérez", correo: "juan@live.uleam.edu.ec", rol: "Estudiante" },
    { nombre: "Mg. Torres", correo: "torres@uleam.edu.ec", rol: "Tutor" },
    { nombre: "Admin ULEAM", correo: "admin@uleam.edu.ec", rol: "Administrativo" },
  ];

  const tablaEstudiantes = document.getElementById("tabla-estudiantes");
  const tablaTutores = document.getElementById("tabla-tutores");
  const tablaUsuarios = document.getElementById("tabla-usuarios");

  const facultadSelect = document.getElementById("facultad-select");
  const departamentoSelect = document.getElementById("departamento-select");
  const filtroTutores = document.getElementById("filtro-tutores-disponibles");
  const filtroEstudiantes = document.getElementById("filtro-estudiantes-sin-tutor");

  function cargarInterfaz() {
    const facultad = facultadSelect.value;
    const departamento = departamentoSelect.value;

    // Filtrar estudiantes
    const estudiantesFiltrados = estudiantes.filter(est =>
      est.facultad === facultad &&
      (!departamento || est.departamento === departamento) &&
      (!filtroEstudiantes.checked || est.tutor === null)
    );

    // Filtrar tutores
    const tutoresFiltrados = tutores.filter(tutor =>
      tutor.facultad === facultad &&
      (!departamento || tutor.departamento === departamento) &&
      (!filtroTutores.checked || tutor.asignados < 3)
    );

    // Renderizar estudiantes
    tablaEstudiantes.innerHTML = "";
    estudiantesFiltrados.forEach(est => {
      const fila = document.createElement("tr");
      const tutorAsignado = est.tutor ? est.tutor : "Sin asignar";

      fila.innerHTML = `
        <td>${est.nombre}</td>
        <td>${est.carrera}</td>
        <td>${est.departamento}</td>
        <td>${tutorAsignado}</td>
        <td>
          ${est.tutor
            ? `<button>Quitar</button><button>Cambiar</button>`
            : `<button class="asignar" data-est='${est.nombre}'>Asignar</button>`}
        </td>
      `;
      tablaEstudiantes.appendChild(fila);
    });

    // Renderizar tutores
    tablaTutores.innerHTML = "";
    tutoresFiltrados.forEach(tutor => {
      const estado = tutor.asignados >= 3 ? "Ocupado" : "Disponible";
      const color = estado === "Disponible" ? "green" : "red";

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${tutor.nombre}</td>
        <td>${tutor.departamento}</td>
        <td>${tutor.asignados}</td>
        <td style="color:${color}; font-weight:bold;">${estado}</td>
      `;
      tablaTutores.appendChild(fila);
    });
  }

  // Cargar usuarios
  usuarios.forEach(user => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${user.nombre}</td>
      <td>${user.correo}</td>
      <td>${user.rol}</td>
      <td>
        <button>Editar</button>
        <button>Eliminar</button>
      </td>
    `;
    tablaUsuarios.appendChild(fila);
  });

  // Eventos
  facultadSelect.addEventListener("change", cargarInterfaz);
  departamentoSelect.addEventListener("change", cargarInterfaz);
  filtroTutores.addEventListener("change", cargarInterfaz);
  filtroEstudiantes.addEventListener("change", cargarInterfaz);

  tablaEstudiantes.addEventListener("click", e => {
    if (e.target.classList.contains("asignar")) {
      const estNombre = e.target.dataset.est;
      const est = estudiantes.find(es => es.nombre === estNombre);
      const posibles = tutores.filter(t =>
        t.facultad === est.facultad &&
        t.departamento === est.departamento &&
        t.asignados < 3
      );
      const nombres = posibles.map(p => p.nombre).join(", ");
      const elegido = prompt(`Asignar tutor (${nombres})`);
      if (elegido) {
        est.tutor = elegido;
        const t = tutores.find(t => t.nombre === elegido);
        if (t) t.asignados++;
        cargarInterfaz();
      }
    }
  });
});
