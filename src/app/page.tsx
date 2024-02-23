'use client';

import { adminList, insertProduct } from '@/api/firebase';
import { useEffect, useState } from 'react';

import Wrapper from '@/components/Wrapper';

export default function Home() {
  const [admins, setAdmins] = useState<any>([]);

  useEffect(() => {
    adminList((admin: any) => {
      setAdmins(admin);
    });
  }, []);

  return (
    <Wrapper>
      <div onClick={() => insertProduct('insert')}>Main</div>
    </Wrapper>
  );
}
