import AsyncStorage from '@react-native-async-storage/async-storage';
import { isString } from '../utils/checkTypes';

const storeAsyncStorageData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return 'ok';
  } catch (e) {
    const error = e as Error;
    return error.message;
  }
};

const getAsyncStorageData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (isString(value) && value !== '') {
      return value;
    }
  } catch (e) {
    const error = e as Error;
    return error.message;
  }
};

export { storeAsyncStorageData, getAsyncStorageData };
