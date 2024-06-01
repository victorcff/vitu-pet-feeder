import { ButtonTitle, ModalTitle } from '../types/componentsProps';

const DEVICE_AP_PASSWORD = '12345678';
const DEVICE_AP_SSID = 'VITU PET FEEDER.V1';

const setupNewDeviceInstructionMessage = {
  noWifi: 'Conecte-se a uma rede Wifi para configurar seu novo dispositivo',
  noConnectedDevice: `Conecte-se à rede Wifi com o nome de${'\n'}VITU PET FEEDER.V1.${'\n'}A senha da rede é:`,
  connectedToDevice:
    'Clique no botão abaixo para conectar seu novo dispositivo a uma rede Wifi.',
  insertWifiCredentials: 'Insira as credenciais da sua rede Wifi.',
  insertDeviceName: 'Agora insira um nome para o seu novo dispositivo.',
};

const buttonTitle: ButtonTitle = {
  next: 'AVANÇAR',
  save: 'SALVAR',
  close: 'FECHAR',
  connect: 'CONECTAR',
  login: 'LOGIN',
  createUser: 'CRIAR',
  setupNewDevice: 'CONFIGURAR DISPOSITIVO',
  yes: 'SIM',
  no: 'NÃO',
};

const modalTitle: ModalTitle = {
  warning: 'Atenção!',
  success: 'Pronto!',
  error: 'Erro!',
};

export {
  DEVICE_AP_PASSWORD,
  DEVICE_AP_SSID,
  buttonTitle,
  modalTitle,
  setupNewDeviceInstructionMessage,
};
