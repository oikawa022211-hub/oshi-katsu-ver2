// Firebase SDK (CDN版 - ES Modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDzwidfgQ1kVQQGQd9BIFBvQ7evJcqdxY",
  authDomain: "oshi-katsu-55a29.firebaseapp.com",
  projectId: "oshi-katsu-55a29",
  storageBucket: "oshi-katsu-55a29.firebasestorage.app",
  messagingSenderId: "391146603379",
  appId: "1:391146603379:web:32faf0c1e6b4d1e5e23b06"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
