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
      window.location.href = "../../index.html"; // o cualquier página de inicio
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

    function toggleMenu() {
  const menu = document.getElementById("user-menu");
  if (menu) menu.classList.toggle("hidden");
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "iniciosesion.html";
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;
    firebase.database().ref("usuarios/" + uid).once("value").then((snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const profile = document.getElementById("user-profile");
        if (profile) {
          profile.innerHTML = `
            <img src="../img/default-profile.png" alt="Perfil" class="profile-icon" onclick="toggleMenu()" />
            <div id="user-menu" class="user-menu hidden">
              <p id="user-name">${userData.nombre || "Sin nombre"}</p>
              <p id="user-email">${userData.email || user.email}</p>
              <button onclick="logout()">Cerrar sesión</button>
            </div>
          `;
        }
      }
    });
  } else {
    const profile = document.getElementById("user-profile");
    if (profile) profile.style.display = "none";
  }
});

}
