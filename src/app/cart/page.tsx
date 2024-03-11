'use client';

import { IUsersCartProps } from '@/types/firebaseTypes';
import ImageComponent from '@/components/Common/Image';
import Wrapper from '@/components/Wrapper';
import { getUserCartList } from '@/api/firebase';
import { isNil } from 'ramda';
import styles from './index.module.scss';
import { useAuthContext } from '@/components/Context/AuthContext';
import { useMemo } from 'react';
import useProduct from '@/hooks/useProducts';
import { useQuery } from '@tanstack/react-query';

export default function Cart() {
  const context = useAuthContext();
  const user = context?.user.user;

  const { data: cartData } = useQuery({
    queryKey: ['usersCart'],
    queryFn: () => getUserCartList(user?.uid || ''),
  });

  const { changeProductAmount, deleteCart } = useProduct();

  const changeAmount = async (changeTarget: string, product: IUsersCartProps) => {
    if (user) {
      if (changeTarget === '-' && product.count > 1) {
        const uid = user.uid;
        changeProductAmount.mutate({ changeTarget, product, uid });
      } else if (changeTarget === '+') {
        const uid = user.uid;
        changeProductAmount.mutate({ changeTarget, product, uid });
      }
    }
  };

  const deleteProduct = async (product: IUsersCartProps) => {
    if (user) {
      const uid = user.uid;
      deleteCart.mutate({ product, uid });
    }
  };

  const sumProductsPrice = useMemo(() => {
    if (cartData) {
      return cartData?.reduce((result, cart) => {
        const value = cart.count * cart.price;

        return result + value;
      }, 0);
    }

    return 0;
  }, [changeAmount, cartData]);

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
                      <button className={styles.deleteBtn} onClick={() => deleteProduct(product)}>
                        Del
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={styles.totalPrice}>
          <div className={styles.priceContainer}>
            Products price
            <div className={styles.price}>${sumProductsPrice}</div>
          </div>
          <div>+</div>
          <div className={styles.priceContainer}>
            Delevery price
            <div className={styles.price}>$3000</div>
          </div>
          <div>=</div>
          <div className={styles.priceContainer}>
            Total price
            <div className={styles.price}>${sumProductsPrice + 3000}</div>
          </div>
        </div>
        <div className={styles.orderButton} onClick={() => console.log('Ordering...')}>
          Order
        </div>
      </div>
    </Wrapper>
  );
}
