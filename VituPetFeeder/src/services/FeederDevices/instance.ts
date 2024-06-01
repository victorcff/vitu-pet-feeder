import axios from 'axios';
import { SERVER_BASE_URL } from '../consts';

const FeederDeviceInstance = axios.create({
  baseURL: SERVER_BASE_URL.DESENV,
  timeout: 3000,
  timeoutErrorMessage: 'Timeout de 3 segundos. Tente novamente.',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default FeederDeviceInstance;
