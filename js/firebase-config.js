// Firebase initialization — shared across every page on the site.
// Uses the Firebase modular CDN SDK so no build step / npm is required,
// which keeps this deployable as-is on GitHub Pages.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getStorage
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4nLlRgIbYL6vxmyw5V8D1F3_Fixtfc5w",
  authDomain: "terminators-esports.firebaseapp.com",
  projectId: "terminators-esports",
  storageBucket: "terminators-esports.firebasestorage.app",
  messagingSenderId: "737418872311",
  appId: "1:737418872311:web:bf1be1b7932b271fb91af2"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Only this Gmail address can ever reach the Super Admin page.
// Change this to your real Gmail before going live.
export const SUPER_ADMIN_EMAIL = "mico.is.feared@gmail.com";
