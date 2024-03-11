'use client';

import { MouseEvent, useEffect, useState } from 'react';

import ImageComponent from '@/components/Common/Image';
import Wrapper from '@/components/Wrapper';
import { getProduct } from '@/api/firebase';
import styles from './index.module.scss';
import { useAuthContext } from '@/components/Context/AuthContext';
import { useParams } from 'next/navigation';
import useProduct from '@/hooks/useProducts';
import { useQuery } from '@tanstack/react-query';

export default function Products() {
  const context = useAuthContext();
  const { id } = useParams();
  const user = context?.user.user;

  const [option, setOption] = useState('');

  const { data: product } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProduct(id),
  });

  const { insertCart } = useProduct();

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
