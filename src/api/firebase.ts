import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { get, getDatabase, ref, set } from 'firebase/database';

import { IProductListProps } from '@/types/firebaseTypes';
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';

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
  signInWithPopup(auth, provider).catch(console.error);
}

export async function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback: any) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;

    const userCopy = JSON.parse(JSON.stringify(updatedUser));

    callback(userCopy);
  });
}

export async function adminUser(user: User) {
  return get(ref(db, 'admins')).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);

      return { ...user, isAdmin };
    }
  });
}

export function insertProduct(
  imgLink: string,
  productName: string,
  price: number,
  category: string,
  productDescription: string,
  options: string,
) {
  const spreadOption = options.toUpperCase().split(',');
  set(ref(db, `products/${uuidv4()}`), {
    image: imgLink,
    title: productName,
    price,
    category,
    description: productDescription,
    options: spreadOption,
  });
}

export async function getProductList() {
  return get(ref(db, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      let array = [] as IProductListProps[];
      const products = snapshot.val();

      for (const key in products) {
        const newMemberObj = {
          id: key,
          ...products[key],
        };

        array.push(newMemberObj);
      }

      return array;
    }

    return [];
  });
}

export async function getProduct(id: string | string[]) {
  return get(ref(db, `products/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const products = snapshot.val() as IProductListProps;

      return products;
    }
  });
}
