document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("form-registro");
  const camposRol = document.getElementById("campos-rol");
  const rol = document.getElementById("rol");
  const mensajeExito = document.getElementById("mensaje-exito");

  // Mostrar campos adicionales según el rol seleccionado
  rol.addEventListener("change", function () {
    camposRol.innerHTML = "";

    if (rol.value === "estudiante") {
      camposRol.innerHTML = `
        <label for="facultad">Facultad:</label>
        <input type="text" id="facultad" name="facultad" required>

        <label for="carrera">Carrera:</label>
        <input type="text" id="carrera" name="carrera" required>

        <label for="semestre">Semestre:</label>
        <input type="text" id="semestre" name="semestre" required>
      `;
    } else if (rol.value === "tutor") {
      camposRol.innerHTML = `
        <label for="facultad">Facultad:</label>
        <input type="text" id="facultad" name="facultad" required>

        <label for="departamento">Departamento:</label>
        <input type="text" id="departamento" name="departamento" required>
      `;
    }
    // Administrativo no requiere campos adicionales
  });

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    mensajeExito.textContent = "";

    // Limpiar errores anteriores
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    // Capturar valores
    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const clave = document.getElementById("clave").value.trim();
    const rolSeleccionado = rol.value;

    let valido = true;

    // Validación de campos obligatorios
    if (!nombres) {
      document.getElementById("error-nombres").textContent = "Campo obligatorio.";
      valido = false;
    }

    if (!apellidos) {
      document.getElementById("error-apellidos").textContent = "Campo obligatorio.";
      valido = false;
    }

    // Validación numérica de cédula (exactamente 10 dígitos)
    if (!/^\d{10}$/.test(cedula)) {
      document.getElementById("error-cedula").textContent = "Ingrese una cédula válida de 10 dígitos.";
      valido = false;
    }

    if (!ciudad) {
      document.getElementById("error-ciudad").textContent = "Campo obligatorio.";
      valido = false;
    }

    // Validación numérica de celular (entre 7 y 10 dígitos)
    if (!/^\d{7,10}$/.test(celular)) {
      document.getElementById("error-celular").textContent = "Ingrese un celular válido (solo números).";
      valido = false;
    }

    // Validación del correo institucional según el rol
    if (!correo.endsWith("@uleam.edu.ec") && !correo.endsWith("@live.uleam.edu.ec")) {
      document.getElementById("error-correo").textContent = "Correo institucional inválido.";
      valido = false;
    } else {
      if (correo.endsWith("@live.uleam.edu.ec") && rolSeleccionado !== "estudiante") {
        document.getElementById("error-correo").textContent = "Este correo solo es válido para estudiantes.";
        valido = false;
      }

      if (correo.endsWith("@uleam.edu.ec") && rolSeleccionado === "estudiante") {
        document.getElementById("error-correo").textContent = "Los estudiantes deben usar @live.uleam.edu.ec.";
        valido = false;
      }
    }

    // Validación de contraseña
    if (clave.length < 6) {
      document.getElementById("error-clave").textContent = "Mínimo 6 caracteres.";
      valido = false;
    }

    if (!rolSeleccionado) {
      document.getElementById("error-rol").textContent = "Debe seleccionar un rol.";
      valido = false;
    }

    // Mostrar mensaje final si todo está correcto
    if (valido) {
      mensajeExito.textContent = "Registro exitoso.";
      formulario.reset();
      camposRol.innerHTML = "";
    }
  });
});
