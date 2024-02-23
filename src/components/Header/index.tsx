'use client';

import { login, logout, onUserStateChange } from '@/api/firebase';
import { useEffect, useState } from 'react';

import ImageComponent from '../Common/Image';
import Link from 'next/link';
import { User } from 'firebase/auth';
import clsx from 'clsx';
import pencilPNG from '@/assets/header/pencil.png';
import styles from './index.module.scss';
import { useUser } from '../hooks/store/user';

const Header = () => {
  // TODO: recoil 사용시 error 발생
  const [userr, settUser] = useState<null | User>(null);
  const { user, setUser } = useUser();

  const setLogin = async () => {
    const userInfo = await login();
    setUser(userInfo);
  };

  const setLogout = () => {
    logout().then(setUser);
  };

  useEffect(() => {
    onUserStateChange((user: User) => {
      // settUser(user);
      setUser(user);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href={'/'}>Shoppy</Link>
        <div className={styles.content}>
          <Link className={styles.headerContent} href={`/products`}>
            Products
          </Link>
          {user && (
            <>
              <Link className={styles.headerContent} href={`/cart`}>
                Cart
              </Link>
              <Link href={`/upload`}>
                <ImageComponent src={pencilPNG} className={clsx(styles.headerContent, styles.uploadImg)} />
              </Link>
              <div className={clsx(styles.headerContent, styles.userProfile)}>
                <ImageComponent src={user.photoURL || ''} className={styles.userImg} />
                <div>{user.displayName}</div>
              </div>
            </>
          )}
          <button className={styles.loginBtn} onClick={user ? setLogout : setLogin}>
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
