'use client';

import Link from 'next/link';
import ProductCard from '@/components/Dashboard/ProductCard';
import Wrapper from '@/components/Wrapper';
import { getProductList } from '@/api/firebase';
import styles from './index.module.scss';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProductList,
  });

  return (
    <Wrapper>
      <div>
        <div className={styles.backgroundContainer}>JUNIAHN SHOPPY</div>
        <div>
          {isLoading && <div>Data loading...</div>}
          {error && <div>Error data</div>}
          {!isLoading && !error && (
            <div className={styles.products}>
              {products?.map((product) => {
                return (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <ProductCard product={product} />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
