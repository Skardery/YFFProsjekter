import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCbrQtBIWGU41ihHS5fgM15-6oG6qjEN2E",
  authDomain: "prosjekt1-2ab5e.firebaseapp.com",
  projectId: "prosjekt1-2ab5e",
  storageBucket: "prosjekt1-2ab5e.firebasestorage.app",
  messagingSenderId: "460983282146",
  appId: "1:460983282146:web:02ec97299afc996249b1bb"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { database, ref, push, set };
