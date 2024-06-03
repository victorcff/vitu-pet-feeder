import { createContext, useContext, useState } from 'react';
import { FeederDeviceContextData } from './types';
import { FeederDevice } from '../../types/api';
const FeederDevicesContext = createContext<FeederDeviceContextData>(
  {} as FeederDeviceContextData,
);

const FeederDevicesProvider = ({ children }: { children: React.ReactNode }) => {
  const [feederDevices, setFeederDevices] = useState<FeederDevice[]>([]);

  return (
    <FeederDevicesContext.Provider value={{ setFeederDevices, feederDevices }}>
      {children}
    </FeederDevicesContext.Provider>
  );
};

function useFeederDevices() {
  const context = useContext(FeederDevicesContext);
  if (!context)
    throw new Error(
      'useFeederDevices precisa ser usado dentro de AuthProvider.',
    );

  return context;
}

export { FeederDevicesProvider, useFeederDevices };
