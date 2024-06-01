import axios from 'axios';
import { SERVER_BASE_URL } from '../consts';

const UserInstance = axios.create({
  baseURL: SERVER_BASE_URL.DESENV,
  timeout: 60000,
  timeoutErrorMessage: 'Timeout de 1 minuto. Tente novamente.',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export default UserInstance;
