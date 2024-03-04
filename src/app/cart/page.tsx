'use client';

import ImageComponent from '@/components/Common/Image';
import Wrapper from '@/components/Wrapper';
import { getUserCartList } from '@/api/firebase';
import styles from './index.module.scss';
import { useAuthContext } from '@/components/Context/AuthContext';
import { useQuery } from '@tanstack/react-query';

export default function Cart() {
  const context = useAuthContext();
  const user = context?.user.user;

  const { data: cartData } = useQuery({
    queryKey: ['usersCart'],
    queryFn: () => getUserCartList(user?.uid || ''),
  });

  const changeAmount = async (changeTarget: string) => {
    console.log(changeTarget);
  };

  return (
    <Wrapper>
      <div>
        <div className={styles.header}>My basket</div>
        <div className={styles.productsBody}>
          {cartData?.map((product, idx) => {
            return (
              <div key={idx} className={styles.cartList}>
                <ImageComponent className={styles.image} src={product.image} />
                <div className={styles.productInfo}>
                  <div>
                    {product.title}
                    <div className={styles.option}>{product.option}</div>${product.price}
                  </div>
                  <div className={styles.amountContainer}>
                    <button className={styles.amountChangeBtn} onClick={() => changeAmount('-')}>
                      -
                    </button>
                    <div className={styles.countNumber}>{product.count}</div>
                    <button className={styles.amountChangeBtn} onClick={() => changeAmount('+')}>
                      +
                    </button>
                    <button className={styles.deleteBtn}>Del</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}
