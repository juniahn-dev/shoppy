'use client';

import { changeProductAmountInCart, deleteProductInCart, getUserCartList } from '@/api/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IUsersCartProps } from '@/types/firebaseTypes';
import ImageComponent from '@/components/Common/Image';
import Wrapper from '@/components/Wrapper';
import { isNil } from 'ramda';
import styles from './index.module.scss';
import { useAuthContext } from '@/components/Context/AuthContext';

interface ICartProductAmountProps {
  changeTarget: string;
  product: IUsersCartProps;
  uid: string;
}

interface IDeleteCartProductProps {
  product: IUsersCartProps;
  uid: string;
}

export default function Cart() {
  const context = useAuthContext();
  const user = context?.user.user;

  const { data: cartData } = useQuery({
    queryKey: ['usersCart'],
    queryFn: () => getUserCartList(user?.uid || ''),
  });

  const queryClient = useQueryClient();
  const insertCart = useMutation({
    mutationFn: async ({ changeTarget, product, uid }: ICartProductAmountProps) =>
      await changeProductAmountInCart(changeTarget, product, uid),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usersCart'] }),
  });
  const deleteCart = useMutation({
    mutationFn: async ({ product, uid }: IDeleteCartProductProps) => await deleteProductInCart(product, uid),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usersCart'] }),
  });

  const changeAmount = async (changeTarget: string, product: IUsersCartProps) => {
    if (user) {
      if (changeTarget === '-' && product.count > 1) {
        const uid = user.uid;
        insertCart.mutate({ changeTarget, product, uid });
      } else if (changeTarget === '+') {
        const uid = user.uid;
        insertCart.mutate({ changeTarget, product, uid });
      }
    }
  };

  const deleteProduct = async (product: IUsersCartProps) => {
    if (user) {
      const uid = user.uid;
      deleteCart.mutate({ product, uid });
    }
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
                      <button className={styles.deleteBtn} onClick={() => deleteProduct(product)}>
                        Del
                      </button>
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
