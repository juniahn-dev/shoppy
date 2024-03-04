'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { getProduct, insertUserCart } from '@/api/firebase';

import ImageComponent from '@/components/Common/Image';
import Wrapper from '@/components/Wrapper';
import styles from './index.module.scss';
import { useAuthContext } from '@/components/Context/AuthContext';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function Products() {
  const context = useAuthContext();
  const { id } = useParams();
  const user = context?.user.user;

  const { data: product } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProduct(id),
  });

  const [option, setOption] = useState('');

  useEffect(() => {
    setOption(product ? product.options[0] : '');
  }, [product]);

  const submitProduct = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (product && !user) {
      return;
    }

    if (product) {
      await insertUserCart(id, product.image, product.title, product.price, option, user?.uid);
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
