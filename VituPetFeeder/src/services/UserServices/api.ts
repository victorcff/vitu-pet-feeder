import { User } from '../../types/api';
import { GET_USER_BY_ID } from './endpoints';
import UserInstance from './instance';

const getUserById = async (userId: number) => {
  return UserInstance.get<User>(`${GET_USER_BY_ID}/${userId}`, {});
};

export { getUserById };
