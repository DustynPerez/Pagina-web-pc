function registrarUsuario() {
  const nombre = document.getElementById("name").value.trim();
  const apellido = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const emailConfirm = document.getElementById("email-confirm").value.trim();
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("password-confirm").value;

  if (!nombre || !apellido || !email || !password) {
    alert("Completa todos los campos");
    return;
  }

  if (email !== emailConfirm || password !== passwordConfirm) {
    alert("Correos o contraseñas no coinciden");
    return;
  }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Guardar datos adicionales en Firestore
        return db.collection("usuarios").doc(user.uid).set({
          nombre: nombre,
          apellido: apellido,
          email: email
        });
      })
    .then(() => {
      alert("Registro exitoso");
      window.location.href = "iniciosesion.html"; // redirige al login
    })
    .catch((error) => {
      alert("Error al registrar: " + error.message);
    });
}
