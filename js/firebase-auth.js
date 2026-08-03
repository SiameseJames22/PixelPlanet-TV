// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA-72dzjpYCQSGba5CLC3oUfBr0XnlfKQ",
  authDomain: "pixelplanet-tv.firebaseapp.com",
  projectId: "pixelplanet-tv",
  storageBucket: "pixelplanet-tv.firebasestorage.app",
  messagingSenderId: "852499743251",
  appId: "1:852499743251:web:24e3d735a67ccd9b1135e6",
  measurementId: "G-5TJXCDF62P"
};

// Initialize Firebase & Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// List of Admin Emails
const ADMIN_EMAILS = ['robloxworld607@gmail.com', 'jamesw3468@outlook.com'];

// Helper to save session and redirect
function handleSuccessfulAuth(user) {
    const userSession = {
        email: user.email,
        isAdmin: ADMIN_EMAILS.includes(user.email),
        uid: user.uid
    };
    localStorage.setItem('pixelPlanetUser', JSON.stringify(userSession));
    localStorage.setItem('pixelPlanetUsername', user.displayName || user.email.split('@')[0]);
    window.location.href = 'home.html';
}

// 1. Email/Password Login or Register
export async function submitAuthForm(email, password, isLoginMode, username = '') {
    try {
        if (isLoginMode) {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            handleSuccessfulAuth(userCredential.user);
        } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (username) {
                localStorage.setItem('pixelPlanetUsername', username);
            }
            handleSuccessfulAuth(userCredential.user);
        }
    } catch (error) {
        alert("Authentication Error: " + error.message);
        throw error;
    }
}

// 2. Google Pop-up Login
export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        handleSuccessfulAuth(result.user);
    } catch (error) {
        alert("Google Login Error: " + error.message);
    }
}

// 3. Logout Helper
export async function logoutUser() {
    await signOut(auth);
    localStorage.removeItem('pixelPlanetUser');
    localStorage.removeItem('pixelPlanetUsername');
    window.location.href = 'index.html';
}
