import axios from 'axios';
import { SERVER_BASE_URL } from '../consts';

const FeederDeviceInstance = axios.create({
  baseURL: `${SERVER_BASE_URL.DESENV}/feeder-devices`,
  timeout: 10000,
  timeoutErrorMessage: 'Timeout de 10 segundos. Tente novamente.',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default FeederDeviceInstance;
