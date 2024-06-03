import { AuthProvider } from './Auth/auth';
import { FeederDevicesProvider } from './FeederDevices';

const ContextsProvider = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <FeederDevicesProvider>{children}</FeederDevicesProvider>
  </AuthProvider>
);

export default ContextsProvider;
