import { ClientRequester } from '@/libs/requester/ClientRequester';
import { useState } from 'react';

const useAxios = () => {
  const [requester] = useState<ClientRequester>(new ClientRequester());

  return {
    fetch: requester.fetch,
  };
};

export default useAxios;
