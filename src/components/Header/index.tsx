'use client';

import { login, logout } from '@/api/firebase';

import ImageComponent from '../Common/Image';
import Link from 'next/link';
import clsx from 'clsx';
import pencilPNG from '@/assets/header/pencil.png';
import styles from './index.module.scss';
import { useAuthContext } from '../Context/AuthContext';
import { useRouter } from 'next/navigation';

const Header = () => {
  const context = useAuthContext();
  const user = context?.user.user;
  const router = useRouter();

  const logoutFunc = () => {
    logout();
    router.replace('/');
  };

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
              {user?.isAdmin && (
                <Link href={`/upload`}>
                  <ImageComponent src={pencilPNG} className={clsx(styles.headerContent, styles.uploadImg)} />
                </Link>
              )}
              <div className={clsx(styles.headerContent, styles.userProfile)}>
                <ImageComponent src={user?.photoURL || ''} className={styles.userImg} />
                <div>{user?.displayName}</div>
              </div>
            </>
          )}
          <button className={styles.loginBtn} onClick={user ? logoutFunc : login}>
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
