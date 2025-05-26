
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de proceder al pago.");
        return;
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            alert("Debes iniciar sesión para proceder al pago.");
            window.location.href = "iniciosesion.html";
        } else {
            const nombre = user.displayName || "Cliente";
            const email = user.email;

            const productos = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

            const templateParams = {
                user_name: nombre,
                user_email: email,
                cart_items: productos,
                total: `$${total}`
            };

            emailjs.send('service_zqzs9a5', 'template_x2afgqq', templateParams)
                .then(function(response) {
                    alert("Pago exitoso. Se ha enviado una notificación a tu correo.");
                    localStorage.removeItem('cart');
                    window.location.href = "pago.html";
                }, function(error) {
                    console.error("Error al enviar correo:", error);
                    alert("No se pudo enviar el correo de confirmación.");
                });
        }
    });
}
