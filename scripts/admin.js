document.addEventListener("DOMContentLoaded", function () {
  const estudiantes = [
    { nombre: "Juan Pérez", carrera: "Sistemas", tutor: null, facultad: "Ingeniería" },
    { nombre: "Ana Ríos", carrera: "Sistemas", tutor: "Mg. Torres", facultad: "Ingeniería" },
    { nombre: "Mario López", carrera: "Finanzas", tutor: null, facultad: "Contabilidad" },
  ];

  const tutores = [
    { nombre: "Mg. Torres", departamento: "Sistemas", asignados: 1, facultad: "Ingeniería" },
    { nombre: "Ing. Ramírez", departamento: "Electrónica", asignados: 0, facultad: "Ingeniería" },
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
  const filtroTutores = document.getElementById("filtro-tutores-disponibles");
  const filtroEstudiantes = document.getElementById("filtro-estudiantes-sin-tutor");

  function cargarInterfaz() {
    const facultad = facultadSelect.value;

    // Filtrar estudiantes
    const estudiantesFiltrados = estudiantes.filter(est =>
      est.facultad === facultad &&
      (!filtroEstudiantes.checked || est.tutor === null)
    );

    // Filtrar tutores
    const tutoresFiltrados = tutores.filter(tutor =>
      tutor.facultad === facultad &&
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
        <td>${tutorAsignado}</td>
        <td>
          ${est.tutor
            ? `<button>Quitar</button><button>Cambiar</button>`
            : `<button>Asignar</button>`}
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
  filtroTutores.addEventListener("change", cargarInterfaz);
  filtroEstudiantes.addEventListener("change", cargarInterfaz);
});
