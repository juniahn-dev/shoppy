'use client';

import { changeProductAmountInCart, getUserCartList } from '@/api/firebase';

import { IUsersCartProps } from '@/types/firebaseTypes';
import ImageComponent from '@/components/Common/Image';
import Wrapper from '@/components/Wrapper';
import { isNil } from 'ramda';
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

  const changeAmount = async (changeTarget: string, product: IUsersCartProps) => {
    await changeProductAmountInCart(changeTarget, product, user?.uid);
  };

  return (
    <Wrapper>
      <div>
        <div className={styles.header}>My basket</div>
        <div className={styles.productsBody}>
          {isNil(cartData) && <div>Empty</div>}
          {!isNil(cartData) &&
            cartData.map((product, idx) => {
              return (
                <div key={idx} className={styles.cartList}>
                  <ImageComponent className={styles.image} src={product.image} />
                  <div className={styles.productInfo}>
                    <div>
                      {product.title}
                      <div className={styles.option}>{product.option}</div>${product.price}
                    </div>
                    <div className={styles.amountContainer}>
                      <button className={styles.amountChangeBtn} onClick={() => changeAmount('-', product)}>
                        -
                      </button>
                      <div className={styles.countNumber}>{product.count}</div>
                      <button className={styles.amountChangeBtn} onClick={() => changeAmount('+', product)}>
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
