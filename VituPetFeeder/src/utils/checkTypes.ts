import { AuthenticateUserRequest, FeederDevice, User } from '../types/api';

const isUser = (supposedUser: unknown): supposedUser is User => {
  return (supposedUser as User).id !== undefined;
};

const isLoginParams = (
  supposedLoginParams: unknown,
): supposedLoginParams is AuthenticateUserRequest => {
  return (
    (supposedLoginParams as AuthenticateUserRequest).username !== undefined &&
    (supposedLoginParams as AuthenticateUserRequest).password !== undefined
  );
};

const isFeederDevice = (
  supposedFeederDevice: unknown,
): supposedFeederDevice is FeederDevice => {
  return (supposedFeederDevice as FeederDevice).id !== undefined;
};

function isString(supposedString: unknown): supposedString is string {
  return typeof supposedString === 'string';
}

function isNumber(supposedString: unknown): supposedString is number {
  return typeof supposedString === 'number';
}

export { isUser, isFeederDevice, isString, isNumber, isLoginParams };
