'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { getProduct, insertUserCart } from '@/api/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IProductListProps } from '@/types/firebaseTypes';
import ImageComponent from '@/components/Common/Image';
import Wrapper from '@/components/Wrapper';
import styles from './index.module.scss';
import { useAuthContext } from '@/components/Context/AuthContext';
import { useParams } from 'next/navigation';

interface ICartProps {
  id: string | string[];
  product: IProductListProps;
  option: string;
  uid: string;
}

export default function Products() {
  const context = useAuthContext();
  const { id } = useParams();
  const user = context?.user.user;

  const queryClient = useQueryClient();
  const insertCart = useMutation({
    mutationFn: async ({ id, product, option, uid }: ICartProps) =>
      await insertUserCart(id, product.image, product.title, product.price, option, uid),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usersCart'] }),
  });

  const { data: product } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProduct(id),
  });

  const [option, setOption] = useState('');

  useEffect(() => {
    setOption(product ? product.options[0] : '');
  }, [product]);

  const submitProduct = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (product && user) {
      const uid = user.uid;
      insertCart.mutate({ id, product, option, uid });
    }
  };

  const onChangeHandler = (event: any) => {
    setOption(event.currentTarget.value);
  };

  return (
    <Wrapper>
      {product ? (
        <div className={styles.container}>
          <ImageComponent className={styles.productImg} src={product.image} />
          <div>
            <div className={styles.productTitle}>
              {product.title}
              <div className={styles.productPrice}>${product.price}</div>
            </div>
            {product.description}
            <form className={styles.addCartToProductForm}>
              <div className={styles.selectOption}>
                Option:
                <select onChange={onChangeHandler} className={styles.productOptions}>
                  {product.options.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className={styles.submitButton} onClick={submitProduct}>
                {user ? 'Add cart' : 'Login first'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>none</div>
      )}
    </Wrapper>
  );
}
