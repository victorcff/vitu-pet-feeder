import {
  CreateDeviceRequest,
  CreateDeviceResponse,
  FeederDevice,
  FeederDeviceResponse,
  GetMacAddressResponse,
  GetRealTimeResponse,
} from '../../types/api';
import {
  GET_REAL_TIME_WEIGHT,
  GET_MAC_ADDRESS,
  RECONNECT_DEVICE,
} from './endpoints';
import FeederDeviceInstance from './instance';

const createDevice = async (params: CreateDeviceRequest) => {
  return FeederDeviceInstance.post<CreateDeviceResponse>('', params);
};

const getMacAddress = async () => {
  return FeederDeviceInstance.get<GetMacAddressResponse>(GET_MAC_ADDRESS);
};

const getRealTimeWeight = async () => {
  return FeederDeviceInstance.get<GetRealTimeResponse>(
    GET_REAL_TIME_WEIGHT,
    {},
  );
};

const deleteDevice = async (feederDeviceId: number) => {
  return FeederDeviceInstance.delete<FeederDevice>(`/${feederDeviceId}`);
};

const reconnectDevice = async () => {
  return FeederDeviceInstance.post<string>(RECONNECT_DEVICE, {});
};

const getAllDevicesFromUser = async (userId: number) => {
  return FeederDeviceInstance.get<FeederDeviceResponse[]>(`/${userId}`);
};

export {
  getRealTimeWeight,
  deleteDevice,
  createDevice,
  getMacAddress,
  reconnectDevice,
  getAllDevicesFromUser,
};
