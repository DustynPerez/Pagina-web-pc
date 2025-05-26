async function checkout() {
  try {
    // 1. Verificación de entorno
    if (typeof navigator !== 'undefined' && 
        (navigator.webdriver || /HeadlessChrome/.test(navigator.userAgent))) {
      throw new Error("Navegador no compatible. Por favor usa Chrome, Firefox o Edge normal.");
    }

    // 2. Verificar carrito
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    // 3. Verificar autenticación
    const user = firebase.auth().currentUser;
    if (!user) {
      alert("Debes iniciar sesión para pagar");
      window.location.href = "iniciosesion.html";
      return;
    }

    // 4. Preparar datos
    const order_id = 'CFX-' + Date.now().toString().slice(-8);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const templateParams = {
      order_id,
      email: user.email,
      user_name: user.displayName || "Cliente",
      orders: cart.map(item => ({
        item: { name: item.name },
        units: item.quantity,
        price: (item.price * item.quantity).toFixed(2),
        image_url: item.image || 'https://via.placeholder.com/64'
      })),
      cost: {
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
      }
    };

    console.log("Enviando datos:", templateParams);

    // 5. Enviar email
    const response = await emailjs.send(
      'service_zqzs9a5',
      'template_x2afgqq',
      templateParams
    );

    if (response.status === 200) {
      alert("¡Compra exitosa! Revisa tu correo.");
      localStorage.removeItem('cart');
      window.location.href = "pago.html";
    } else {
      throw new Error(`Respuesta inesperada: ${response.status}`);
    }
  } catch (error) {
    console.error("Error completo:", error);
    
    // Mensajes más amigables para el usuario
    let userMessage = "Error al procesar el pago";
    if (error.status === 451) {
      userMessage = "Por favor, desactiva los bloqueadores de scripts y recarga la página";
    } else if (error.message.includes("Headless")) {
      userMessage = "No se permiten navegadores en modo automático para pagos";
    }
    
    alert(userMessage);
  }
}