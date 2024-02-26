import { atom, useRecoilState } from 'recoil';

import { User } from 'firebase/auth';
import { isNil } from 'ramda';
import { useEffect } from 'react';

const userState = atom<User | null>({
  key: 'User',
  default: null,
  dangerouslyAllowMutability: true,
});

export const useUser = (initValue?: User) => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    !isNil(initValue) && setUser(initValue);
  }, [initValue]);

  return {
    user,
    setUser,
  };
};
