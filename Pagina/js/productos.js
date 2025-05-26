function registrarProducto() {
  const nombre = document.getElementById("name");
  const precio = document.getElementById("price");

    firebase.auth().createCart(nombre, precio)
      .then((userCredential) => {
        const carro = userCredential.carro;

        // Guardar datos adicionales en Firestore
        return db.collection("producto").doc(carro.uid).set({
          nombre: nombre,
          precio: precio
        });
      })
}
