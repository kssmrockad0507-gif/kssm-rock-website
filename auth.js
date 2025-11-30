import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ---------------- Firebase Config ----------------

const firebaseConfig = {
  apiKey: "AIzaSyCBgBWfpUbtlPbvCfDr6N1_L2svtJglfhM",
  authDomain: "kssm-rock-tam-ad.firebaseapp.com",
  projectId: "kssm-rock-tam-ad",
  storageBucket: "kssm-rock-tam-ad.firebasestorage.app",
  messagingSenderId: "28268633766",
  appId: "1:28268633766:web:f6ee57eaf56f7cbd37de67"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ---------------- LOGIN CODE ----------------

document.getElementById("googleLoginBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        uid: user.uid,
        coins: 0
      });
    }

    alert("Login Success! Welcome: " + user.email);

    // Redirect after login
    window.location.href = "home.html";

  } catch (error) {
    console.log(error);
    alert("Login Failed: " + error.message);
  }
});
