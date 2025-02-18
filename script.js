// Importar el SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Configuración de tu Firebase (obtenida desde el panel de Firebase)
const firebaseConfig = {
    apiKey: "tu-api-key",              // Obtén de tu Firebase Console
    authDomain: "tu-auth-domain.firebaseapp.com",  // Obtén de tu Firebase Console
    projectId: "tu-project-id",        // Obtén de tu Firebase Console
    storageBucket: "tu-storage-bucket.appspot.com", // Obtén de tu Firebase Console
    messagingSenderId: "tu-messaging-sender-id", // Obtén de tu Firebase Console
    appId: "tu-app-id"                 // Obtén de tu Firebase Console
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Referencia de autenticación de Firebase
const auth = getAuth();

// Manejar el inicio de sesión
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            showActivationScreen();  // Muestra la pantalla de activación
        })
        .catch((error) => {
            alert(error.message);  // Muestra el error si ocurre
        });
});

// Manejar el registro de usuario
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Cuenta creada');  // Muestra un mensaje cuando la cuenta se crea
            showLoginScreen();  // Muestra la pantalla de login
        })
        .catch((error) => {
            alert(error.message);  // Muestra el error si ocurre
        });
});

// Función para mostrar la pantalla de login
document.getElementById('show-register').addEventListener('click', () => {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('register-screen').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    document.getElementById('register-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
});

// Función para mostrar la pantalla de activación
function showActivationScreen() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('activation-screen').style.display = 'block';
}

// Validar el código de activación
function validateCode() {
    const code = document.getElementById('activation-code').value;
    if (code === "ACTIVACION123") {  // Reemplaza este código por tu propio código
        showGameScreen();  // Si el código es válido, muestra la pantalla del juego
    } else {
        alert("Código incorrecto");
    }
}

// Función para mostrar la pantalla del juego
function showGameScreen() {
    document.getElementById('activation-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
}

// Función para cerrar sesión
function logout() {
    signOut(auth).then(() => {
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('login-screen').style.display = 'block';
    });
}