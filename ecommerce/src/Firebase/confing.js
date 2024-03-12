import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export const firebaseConfig = {
    apiKey: "AIzaSyDZ-byjzSP53JOSTP5PnCQf3YEeZeanbXM",
    authDomain: "demoproject-ec45e.firebaseapp.com",
    projectId: "demoproject-ec45e",
    storageBucket: "demoproject-ec45e.appspot.com",
    messagingSenderId: "523162082693",
    appId: "1:523162082693:web:c55f512bb5751dda7978ec"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

