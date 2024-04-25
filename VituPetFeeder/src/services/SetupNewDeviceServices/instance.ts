import axios from 'axios';

const SetupNewDeviceServicesInstance = axios.create({
  baseURL: 'http://192.168.4.1',
  timeout: 3000,
  timeoutErrorMessage: 'Timeout de 3 segundos. Tente novamente.',
  headers: {
    'Content-Type': 'text/plain',
    Accept: 'text/plain',
  },
});

export default SetupNewDeviceServicesInstance;
