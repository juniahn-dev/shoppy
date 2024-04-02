import { createContext, useContext } from 'react';

import { IUserCombineProps } from '../../hooks/store/user';

interface IProps {
  user: IUserCombineProps;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IProps | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}
