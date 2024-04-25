import { ButtonTitle, ModalTitle } from '../types/componentsProps';

const DEVICE_AP_PASSWORD = '12345678';
const DEVICE_AP_SSID = 'VITU PET FEEDER.V1';

const setupNewDeviceInstructionMessage = {
  noWifi: 'Conecte-se a uma rede Wifi para configurar seu novo dispositivo',
  noConnectedDevice: `Conecte-se à rede Wifi com o nome de${'\n'}VITU PET FEEDER.V1.${'\n'}A senha da rede é:`,
  connectedToDevice:
    'Vá para a próxima tela para terminar a configuração inicial do seu novo alimentador.',
  insertWifiCredentials: 'Insira as credenciais da sua rede Wifi.',
};

const buttonTitle: ButtonTitle = {
  next: 'AVANÇAR',
  save: 'SALVAR',
  close: 'FECHAR',
  connect: 'CONECTAR',
};

const modalTitle: ModalTitle = {
  warning: 'Atenção!',
  success: 'Pronto!',
};

export {
  DEVICE_AP_PASSWORD,
  DEVICE_AP_SSID,
  buttonTitle,
  modalTitle,
  setupNewDeviceInstructionMessage,
};
