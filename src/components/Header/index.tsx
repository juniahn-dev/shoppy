'use client';

import { getUserCartList, login, logout } from '@/api/firebase';

import ImageComponent from '../Common/Image';
import Link from 'next/link';
import cartPNG from '@/assets/header/cart.png';
import clsx from 'clsx';
import pencilPNG from '@/assets/header/pencil.png';
import styles from './index.module.scss';
import { useAuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const Header = () => {
  const context = useAuthContext();
  const router = useRouter();
  const user = context?.user.user;

  const logoutFunc = () => {
    logout();
    router.replace('/');
  };

  const { data: cartData } = useQuery({
    queryKey: ['usersCart'],
    queryFn: () => getUserCartList(user?.uid || ''),
  });

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
                <ImageComponent src={cartPNG} className={styles.uploadImg} />
                {cartData && cartData.length > 0 && <div className={styles.cartCount}>{cartData.length}</div>}
              </Link>
              {user?.isAdmin && (
                <Link className={styles.headerContent} href={`/upload`}>
                  <ImageComponent src={pencilPNG} className={styles.uploadImg} />
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
