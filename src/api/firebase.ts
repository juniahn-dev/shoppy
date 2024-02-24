import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, onValue, ref, set } from 'firebase/database';

import { call } from 'ramda';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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

// TODO: login 후 page를 router에서 바꾸면 error
export function onUserStateChange(callback: any) {
  onAuthStateChanged(auth, (user) => {
    const copyUser = JSON.parse(JSON.stringify(user));

    callback(copyUser);
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
