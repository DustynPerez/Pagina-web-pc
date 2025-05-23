function registrarUsuario() {
  const nombre = document.getElementById("name").value;
  const apellido = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, apellido, email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.uid) {
      alert("Usuario creado correctamente");
      window.location.href = "iniciosesion.html";
    } else {
      alert("Error: " + data.error);
    }
  });
}
