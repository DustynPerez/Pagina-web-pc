const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos HTML desde /public
app.use(express.static(path.join(__dirname, 'public')));

const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://colorfix-2323c.firebaseio.com" // usa tu URL real si es distinta
});

const auth = admin.auth();
const db = admin.firestore();

// Ruta: Registrar usuario
app.post('/api/register', async (req, res) => {
  const { email, password, nombre, apellido } = req.body;

  try {
    const user = await auth.createUser({
      email,
      password,
      displayName: `${nombre} ${apellido}`
    });

    await db.collection('usuarios').doc(user.uid).set({
      nombre,
      apellido,
      email
    });

    res.status(201).send({ uid: user.uid, mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Ruta: Recuperar contraseña
app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    const link = await auth.generatePasswordResetLink(email);
    res.send({ mensaje: "Enlace generado correctamente", link });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});



app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});
