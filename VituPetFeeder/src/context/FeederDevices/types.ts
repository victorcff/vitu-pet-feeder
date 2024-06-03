import { FeederDevice } from '../../types/api';

type FeederDeviceContextData = {
  setFeederDevices: (devices: FeederDevice[]) => void;
  feederDevices: FeederDevice[];
};

export type { FeederDeviceContextData };
