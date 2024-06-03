import {
  AuthenticateUserRequest,
  FeederDevice,
  Meal,
  User,
} from '../types/api';

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
  return (
    (supposedFeederDevice as FeederDevice).id !== undefined &&
    (supposedFeederDevice as FeederDevice).name !== undefined &&
    (supposedFeederDevice as FeederDevice).ownerId !== undefined
  );
};

const isFeederDeviceArray = (
  supposedFeederDevices: unknown[],
): supposedFeederDevices is FeederDevice[] => {
  return supposedFeederDevices.reduce<boolean>((reducedArray, item) => {
    return (
      (item as FeederDevice).id !== undefined &&
      (item as FeederDevice).name !== undefined &&
      (item as FeederDevice).ownerId !== undefined
    );
  }, true);
};

const isMeal = (supposedMeal: unknown): supposedMeal is Meal => {
  return (
    (supposedMeal as Meal).deviceId !== undefined &&
    (supposedMeal as Meal).name !== undefined &&
    (supposedMeal as Meal).time !== undefined &&
    (supposedMeal as Meal).weight !== undefined &&
    (supposedMeal as Meal).id !== undefined
  );
};

const isString = (supposedString: unknown): supposedString is string => {
  return typeof supposedString === 'string';
};

const isNumber = (supposedString: unknown): supposedString is number => {
  return typeof supposedString === 'number';
};

export {
  isUser,
  isFeederDevice,
  isString,
  isNumber,
  isLoginParams,
  isMeal,
  isFeederDeviceArray,
};
