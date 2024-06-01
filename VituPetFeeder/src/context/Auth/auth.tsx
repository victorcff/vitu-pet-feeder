import { createContext, useContext, useState } from 'react';
import { AuthContextData } from './types';
import { User } from '../../types/api';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (logedUser: User) => {
    setUser(logedUser);
  };

  async function signOut() {
    setUser(null);
  }

  const updateUser = (user: User) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth precisa ser usado dentro de AuthProvider.');

  return context;
}

export { AuthProvider, useAuth };
