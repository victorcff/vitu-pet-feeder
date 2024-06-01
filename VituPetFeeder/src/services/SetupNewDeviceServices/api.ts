import {
  CreateDeviceRequest,
  CreateDeviceResponse,
  GetMacAddressResponse,
} from '../../types/api';
import {
  CREATE_DEVICE_URI,
  GET_MAC_ADDRESS,
  SEND_WIFI_CREDENTIALS_URI,
} from './endpoints';
import {
  SetupNewDeviceServicesAPInstance,
  SetupNewDeviceServicesServerInstance,
} from './instance';

const sendWifiCredentials = async (params: string) => {
  return SetupNewDeviceServicesAPInstance.post<string>(
    `${SEND_WIFI_CREDENTIALS_URI}?data=${params}`,
    {},
  );
};

const createDevice = async (params: CreateDeviceRequest) => {
  return SetupNewDeviceServicesServerInstance.post<CreateDeviceResponse>(
    CREATE_DEVICE_URI,
    params,
  );
};

const getMacAddress = async () => {
  return SetupNewDeviceServicesServerInstance.get<GetMacAddressResponse>(
    GET_MAC_ADDRESS,
  );
};

export { sendWifiCredentials, createDevice, getMacAddress };
