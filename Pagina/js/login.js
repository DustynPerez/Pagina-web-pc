function iniciarSesion() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Completa los campos");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Inicio de sesión exitoso");
      window.location.href = "inicio.html"; // o cualquier página de inicio
    })
    .catch((error) => {
      alert("Error al iniciar sesión: " + error.message);
    });
}

function recuperarContrasena() {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("Por favor, ingresa tu correo electrónico.");
    return;
  }

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Se ha enviado un enlace de recuperación a tu correo.");
    })
    .catch((error) => {
      alert("Error al enviar correo: " + error.message);
    });
}
