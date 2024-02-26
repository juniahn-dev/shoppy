'use client';

import Wrapper from '@/components/Wrapper';
import { insertProduct } from '@/api/firebase';

export default function Home() {
  return (
    <Wrapper>
      <div onClick={() => insertProduct('insert')}>Main</div>
    </Wrapper>
  );
}
