document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("form-login");
  const errorCorreo = document.getElementById("error-correo");
  const errorClave = document.getElementById("error-clave");
  const mensajeExito = document.getElementById("mensaje-exito");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const clave = document.getElementById("clave").value.trim();

    // Limpiamos mensajes anteriores
    errorCorreo.textContent = "";
    errorClave.textContent = "";
    mensajeExito.textContent = "";

    let valido = true;

    // Validar correo
    if (!correo) {
      errorCorreo.textContent = "Este campo es obligatorio.";
      valido = false;
    } else if (
      !correo.endsWith("@uleam.edu.ec") &&
      !correo.endsWith("@live.uleam.edu.ec")
    ) {
      errorCorreo.textContent = "Use un correo institucional válido.";
      valido = false;
    }

    // Validar contraseña
    if (!clave) {
      errorClave.textContent = "Este campo es obligatorio.";
      valido = false;
    } else if (clave.length < 6) {
      errorClave.textContent = "La contraseña debe tener al menos 6 caracteres.";
      valido = false;
    }

    // Si todo está bien, mostrar éxito
    if (valido) {
      mensajeExito.textContent = "Inicio de sesión exitoso.";
      formulario.reset();
    }
  });
});
