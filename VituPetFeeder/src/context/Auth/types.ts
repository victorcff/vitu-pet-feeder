import { User } from '../../types/api';

type AuthContextData = {
  signed: boolean;
  user: User | null;
  signIn: (loggedUser: User) => void;
  signOut: () => void;
  updateUser: (user: User) => void;
};

export type { AuthContextData };
