import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, onValue, ref, set } from 'firebase/database';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
const provider = new GoogleAuthProvider();

export async function login() {
  return signInWithPopup(auth, provider).then((result) => {
    const user = result.user;

    return user;
  });
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback: any) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export function adminList(callback: any) {
  const starCountRef = ref(db, 'admins');
  return onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();

    callback(data);
  });
}

export function insertProduct(name: string) {
  set(ref(db, `products/${2}`), {
    productName: name,
    size: ['xl', 'l', 'm', 's'],
  });
}
