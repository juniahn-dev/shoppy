"use client";

import { login, logout, onUserStateChange } from "@/api/firebase";
import { useEffect, useState } from "react";

import Link from "next/link";
import { User } from "firebase/auth";
import styles from "./index.module.scss";

const Header = () => {
  const [user, setUser] = useState<null | User>(null);

  const setLogin = async () => {
    const userInfo = await login();
    setUser(userInfo);
  };

  const setLogout = () => {
    logout().then(setUser);
  };

  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href={"/"}>Shoppy</Link>
        <div className={styles.content}>
          <Link href={`/products`}>Products</Link>
          <Link href={`/cart`}>Cart</Link>
          <Link href={`/upload`}>Upload product</Link>
          <div>User Info</div>
          <button
            className={styles.loginBtn}
            onClick={user ? setLogout : setLogin}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
