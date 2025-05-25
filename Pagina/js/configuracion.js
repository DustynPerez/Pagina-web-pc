
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLyZ4BB2y60ZyOC-MrR3_0yz8BxKtrC6A",
  authDomain: "colorfix-2323c.firebaseapp.com",
  projectId: "colorfix-2323c",
  storageBucket: "colorfix-2323c.firebasestorage.app",
  messagingSenderId: "275193054598",
  appId: "1:275193054598:web:6a99b77f984d5f51529807",
  measurementId: "G-M64ZE2M84V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();