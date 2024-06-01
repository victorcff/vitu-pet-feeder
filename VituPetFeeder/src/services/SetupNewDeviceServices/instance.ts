import axios from 'axios';
import { DEVICE_ACCESS_POINT_BASE_URL, SERVER_BASE_URL } from '../consts';

const SetupNewDeviceServicesAPInstance = axios.create({
  baseURL: DEVICE_ACCESS_POINT_BASE_URL,
  timeout: 3000,
  timeoutErrorMessage: 'Timeout de 3 segundos. Tente novamente.',
  headers: {
    'Content-Type': 'text/plain',
    Accept: 'text/plain',
  },
});

const SetupNewDeviceServicesServerInstance = axios.create({
  baseURL: SERVER_BASE_URL.DESENV,
  timeout: 60000,
  timeoutErrorMessage: 'Timeout de 1 minuto. Tente novamente.',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export {
  SetupNewDeviceServicesAPInstance,
  SetupNewDeviceServicesServerInstance,
};
