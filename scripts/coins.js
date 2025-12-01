// --- FIREBASE SETUP ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc }
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCBgBWfpUbtlPbvCfDr6N1_L2svtJglfhM",
    authDomain: "kssm-rock-tam-ad.firebaseapp.com",
    projectId: "kssm-rock-tam-ad",
    storageBucket: "kssm-rock-tam-ad.firebasestorage.app",
    messagingSenderId: "28268633766",
    appId: "1:28268633766:web:f6ee57eaf56f7cbd37de67"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// --- AUTO LOAD COINS ---
export function loadCoins() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            const userRef = doc(db, "users", uid);
            const snap = await getDoc(userRef);

            if (snap.exists()) {
                const coins = snap.data().coins || 0;

                const display = document.querySelector("#coinValue");
                if (display) display.innerText = coins;
            }
        }
    });
}


// --- ADD COINS ---
export async function addCoins(amount) {
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;
    const userRef = doc(db, "users", uid);

    const snap = await getDoc(userRef);
    const oldCoins = snap.data().coins || 0;
    const newCoins = oldCoins + amount;

    await updateDoc(userRef, { coins: newCoins });

    document.querySelector("#coinValue").innerText = newCoins;
}
