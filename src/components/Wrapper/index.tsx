'use client';

import Header from '../Header';
import Loading from '../Common/Loading';
import styles from './index.module.scss';
import { useAuthContext } from '../Context/AuthContext';
import { useRouter } from 'next/navigation';

interface WrapperProps {
  children: JSX.Element;
  requireAdmin?: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({ children, requireAdmin }) => {
  const context = useAuthContext();
  const router = useRouter();
  const user = context?.user;

  if (user?.loading) {
    return <Loading />;
  }

  if (!user || (requireAdmin && !user.user?.isAdmin)) {
    router.replace('/');
  }

  return (
    <div className={styles.container}>
      <Header />

      <div>
        <div className={styles.body}>
          {children}
          <div className={styles.footer}>Footer</div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
