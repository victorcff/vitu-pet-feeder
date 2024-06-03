type CreateDeviceRequest = {
  name: string;
  owner_id: number;
  mac_address: string;
};

type CreateDeviceResponse = CreateDeviceRequest & {
  id: number;
};

type FeederDevice = {
  id: number;
  name: string;
  ownerId: number;
  meals: Meal[];
};

type AuthenticateUserRequest = {
  username: string;
  password: string;
};

type UserBase = {
  id: number;
  username: string;
};

type User = UserBase & {
  feederDevices: FeederDevice[];
};

type LoginUserResponse = UserBase & {
  feeder_devices: FeederDevice[];
};

type CreateUserRequest = AuthenticateUserRequest;

type GetRealTimeWeightRequest = {
  // feederDeviceId: number;
};

type GetRealTimeResponse = {
  weight: number;
};

type GetMacAddressResponse = {
  mac_address: string;
};

type MealBase = {
  id: number;
  name: string;
  weight: string;
  time: string;
};

type MealResponse = MealBase & {
  device_id: number;
};

type Meal = MealBase & {
  deviceId: number;
};

type CreateMealRequest = Omit<MealResponse, 'id'>;

type UpdateMealRequest = MealResponse;

export type {
  CreateDeviceResponse,
  CreateDeviceRequest,
  User,
  AuthenticateUserRequest,
  CreateUserRequest,
  FeederDevice,
  GetRealTimeWeightRequest,
  LoginUserResponse,
  GetRealTimeResponse,
  GetMacAddressResponse,
  Meal,
  MealResponse,
  CreateMealRequest,
  UpdateMealRequest,
};
