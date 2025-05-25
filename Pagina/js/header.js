document.addEventListener('DOMContentLoaded', () => {
  const auth = firebase.auth();

  const profileIcon = document.getElementById("profile-icon");
  const dropdown = document.getElementById("user-dropdown");
  const logoutBtn = document.getElementById("logout-btn");
  const userEmail = document.getElementById("user-email");

  profileIcon?.addEventListener("click", () => {
    dropdown?.classList.toggle("hidden");
  });

  logoutBtn?.addEventListener("click", () => {
    auth.signOut().then(() => {
      alert('Has cerrado sesión');
      userEmail.textContent = '';
      dropdown.classList.add("hidden");
    });
  });

  auth.onAuthStateChanged(user => {
    if (user) {
      userEmail.textContent = user.email;
    } else {
      userEmail.textContent = '';
      dropdown.classList.add("hidden");
      // Aquí no haces redirección para que se quede en la página actual
    }
  });
});
