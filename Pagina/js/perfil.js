document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const profileIcon = document.getElementById("profile-icon");
    const dropdown = document.getElementById("user-dropdown");
    const userMenuContainer = document.getElementById("user-menu-container");
    
    // Verificar si los elementos existen
    if (!profileIcon || !dropdown || !userMenuContainer) {
        console.error("No se encontraron los elementos necesarios para el menú de usuario");
        return;
    }
    
    // Configuración de Firebase
    const auth = firebase.auth();
    
    // Función para mostrar menú de usuario autenticado
    function showLoggedInMenu(user) {
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <p id="user-email" class="user-email">${user.email || "Usuario registrado"}</p>
            </div>
            <button id="logout-btn" class="dropdown-btn">
                <span>🚪</span> Cerrar sesión
            </button>
        `;
        
        // Configurar evento de logout
        document.getElementById("logout-btn").addEventListener("click", () => {
            auth.signOut().then(() => {
                console.log("Usuario cerró sesión");
                showLoggedOutMenu();
                alert('Has cerrado sesión');
            }).catch(error => {
                console.error("Error al cerrar sesión:", error);
                alert("Ocurrió un error al cerrar sesión");
            });
        });
    }
    
    // Función para mostrar menú de usuario no autenticado
    function showLoggedOutMenu() {
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <p class="guest-label">Invitado</p>
            </div>
            <button id="login-btn" class="dropdown-btn">
                <span>🔑</span> Iniciar sesión
            </button>
            <button id="register-btn" class="dropdown-btn">
                <span>📝</span> Registrarse
            </button>
        `;
        
        // Configurar eventos de login y registro
        document.getElementById("login-btn").addEventListener("click", () => {
            window.location.href = "iniciosesion.html";
        });
        
        document.getElementById("register-btn").addEventListener("click", () => {
            window.location.href = "registro.html";
        });
    }
    
    // Manejar clic en el icono de perfil
    profileIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("hidden");
        dropdown.classList.toggle("active"); // Alternar ambas clases para compatibilidad
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!userMenuContainer.contains(e.target)) {
            dropdown.classList.add("hidden");
            dropdown.classList.remove("active");
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            dropdown.classList.add("hidden");
            dropdown.classList.remove("active");
        }
    });
    
    // Observar cambios de autenticación
    auth.onAuthStateChanged(user => {
        if (user) {
            showLoggedInMenu(user);
            // No redirigir para que se quede en la página actual
        } else {
            showLoggedOutMenu();
            dropdown.classList.add("hidden");
            dropdown.classList.remove("active");
        }
    });
});