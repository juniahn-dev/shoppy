import { atom, useRecoilState } from 'recoil';

import { User } from 'firebase/auth';

export interface IUserCombineProps {
  user: IUser | null;
  loading: boolean;
}

export interface IUser extends User {
  isAdmin?: boolean;
}

const defaultValue = {
  user: null,
  loading: true,
};

const userState = atom<IUserCombineProps>({
  key: 'User',
  default: defaultValue,
});

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);

  return {
    user,
    setUser,
  };
};
