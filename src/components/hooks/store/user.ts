import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';

import { User } from 'firebase/auth';
import { adminList } from '@/api/firebase';
import { includes } from 'ramda';
import { useEffect } from 'react';

const userState = atom<User | null>({
  key: 'User',
  default: null,
  dangerouslyAllowMutability: true,
});

const adminsState = atom<[]>({
  key: 'Admins',
  default: [],
});

const returnUserState = selector({
  key: 'UserSelector',
  get: ({ get }) => {
    const user = get(userState);

    if (user) {
      const admins = get(adminsState);

      const isCombineAdmin = includes(user.uid, admins);

      return {
        ...user,
        isAdmin: isCombineAdmin,
      };
    }

    return user;
  },
  dangerouslyAllowMutability: true,
});

export const useUser = () => {
  const setUser = useSetRecoilState(userState);
  const setAdmins = useSetRecoilState(adminsState);
  const user = useRecoilValue(returnUserState);

  useEffect(() => {
    adminList((admin: any) => {
      setAdmins(admin);
    });
  }, []);

  return {
    user,
    setUser,
  };
};
