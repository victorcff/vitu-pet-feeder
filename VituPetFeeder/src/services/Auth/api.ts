import {
  AuthenticateUserRequest,
  LoginUserResponse,
  User,
} from '../../types/api';
import { AUTHENTICATE, CREATE_USER } from './endpoints';
import AuthInstance from './instance';

const login = async (params: AuthenticateUserRequest) => {
  return AuthInstance.post<LoginUserResponse>(AUTHENTICATE, params);
};

const createUser = async (params: AuthenticateUserRequest) => {
  return AuthInstance.post<User>(CREATE_USER, params);
};

export { login, createUser };
