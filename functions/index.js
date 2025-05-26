const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Configura el correo de origen
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tu_correo@gmail.com",
    pass: "tu_contraseña_de_aplicación"
  }
});

// Función HTTP para enviar el correo
exports.sendOrderConfirmation = functions.https.onCall((data, context) => {
  const { email, nombre, productos, total } = data;

  const mailOptions = {
    from: "ColorFix <colorfix@gmail.com>",
    to: email,
    subject: "Confirmación de pedido - ColorFix",
    text: `¡Hola ${nombre}!\n\nGracias por tu compra.\n\nResumen del pedido:\n${productos}\n\nTotal: $${total}\n\nSaludos,\nColorFix`
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      console.log("Correo enviado");
      return { success: true };
    })
    .catch(error => {
      console.error("Error al enviar correo:", error);
      throw new functions.https.HttpsError("internal", "No se pudo enviar el correo");
    });
});
