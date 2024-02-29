'use client';

import { useEffect, useState } from 'react';

import { IProductListProps } from '@/types/firebaseTypes';
import Wrapper from '@/components/Wrapper';
import { productList } from '@/api/firebase';

export default function Home() {
  const [products, setProducts] = useState<IProductListProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productList();
        data && setProducts(data);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);
  return (
    <Wrapper>
      <div>
        <div>Header</div>
        <div>
          {products.map((product) => {
            return <div key={product.id}>{product.title}</div>;
          })}
        </div>
      </div>
    </Wrapper>
  );
}
