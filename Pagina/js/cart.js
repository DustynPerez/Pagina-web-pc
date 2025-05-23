// cart.js - Funciones compartidas para el carrito

// Obtener o inicializar el carrito
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar el carrito en localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Actualizar el contador del carrito en todas las páginas
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(el => {
        el.textContent = count;
    });
}

// Añadir producto al carrito
function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    return cart;
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    return cart;
}

// Actualizar cantidad de un producto
function updateQuantity(productId, newQuantity) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        saveCart(cart);
    }
    
    return cart;
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', updateCartCount);
