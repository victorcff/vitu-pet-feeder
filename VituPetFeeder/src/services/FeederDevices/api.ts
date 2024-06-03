import {
  CreateDeviceRequest,
  CreateDeviceResponse,
  FeederDevice,
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

export {
  getRealTimeWeight,
  deleteDevice,
  createDevice,
  getMacAddress,
  reconnectDevice,
};
