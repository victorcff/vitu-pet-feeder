import { GetRealTimeResponse, GetRealTimeWeightRequest } from '../../types/api';
import { GET_REAL_TIME_WEIGHT } from './endpoints';
import FeederDeviceInstance from './instance';

const getRealTimeWeight = async () => {
  return FeederDeviceInstance.get<GetRealTimeResponse>(
    `${GET_REAL_TIME_WEIGHT}`,
    {},
  );
};

export { getRealTimeWeight };
