import { SEND_WIFI_CREDENTIALS_URI } from './consts';
import SetupNewDeviceServicesInstance from './instance';

const sendWifiCredentials = async (params: string) => {
  return SetupNewDeviceServicesInstance.post<string>(
    `${SEND_WIFI_CREDENTIALS_URI}?data=${params}`,
    {},
  );
};

export { sendWifiCredentials };
