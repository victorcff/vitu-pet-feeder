import {
  deleteDevice,
  getRealTimeWeight,
  createDevice,
  getMacAddress,
  reconnectDevice,
  getAllDevicesFromUser,
} from './api';

const FeederDevicesServices = {
  getRealTimeWeight,
  deleteDevice,
  createDevice,
  getMacAddress,
  reconnectDevice,
  getAllDevicesFromUser,
};

export default FeederDevicesServices;
