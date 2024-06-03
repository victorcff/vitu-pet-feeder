import {
  deleteDevice,
  getRealTimeWeight,
  createDevice,
  getMacAddress,
  reconnectDevice,
} from './api';

const FeederDevicesServices = {
  getRealTimeWeight,
  deleteDevice,
  createDevice,
  getMacAddress,
  reconnectDevice,
};

export default FeederDevicesServices;
