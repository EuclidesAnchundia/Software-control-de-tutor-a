document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-recuperar");
  const correoInput = document.getElementById("correo");
  const errorMsg = document.getElementById("error-correo");
  const okMsg = document.getElementById("ok-correo");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const correo = correoInput.value.trim();
    errorMsg.textContent = "";
    okMsg.textContent = "";

    const dominioValido = correo.endsWith("@estudiantes.uleam.edu.ec") || correo.endsWith("@uleam.edu.ec");

    if (!correo || !dominioValido) {
      errorMsg.textContent = "Ingrese un correo institucional válido.";
      return;
    }

    okMsg.textContent = "Se ha enviado un enlace a su correo.";
    form.reset();
  });
});
