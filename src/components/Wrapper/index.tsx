'use client';

import Header from '../Header';
import styles from './index.module.scss';

interface WrapperProps {
  children: JSX.Element;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.body}>
        {children}
        <div className={styles.footer}>Footer</div>
      </div>
    </div>
  );
};

export default Wrapper;
