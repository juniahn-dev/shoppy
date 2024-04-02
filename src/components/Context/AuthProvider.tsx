import { ReactNode, useEffect } from 'react';
import { adminUser, login, logout } from '@/api/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { AuthContext } from './AuthContext';
import { useUser } from '../../hooks/store/user';

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const { user, setUser } = useUser();

  useEffect(() => {
    const stopListen = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        adminUser(user).then((user) => {
          const userCopy = JSON.parse(JSON.stringify(user));

          setUser({ user: userCopy, loading: false });
        });
      } else {
        setUser({ user: null, loading: false });
      }
    });
    return () => stopListen();
  }, [adminUser, getAuth]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
