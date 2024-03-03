'use client';

import ImageComponent from '@/components/Common/Image';
import Wrapper from '@/components/Wrapper';
import { getProduct } from '@/api/firebase';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function Products() {
  const { id } = useParams();

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProduct(id),
  });

  return (
    <Wrapper>
      {product ? (
        <div>
          <ImageComponent src={product.image} />
          <div>{product.title}</div>
        </div>
      ) : (
        <div>none</div>
      )}
    </Wrapper>
  );
}
