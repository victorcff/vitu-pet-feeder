import { Device } from '../types/api';

const deviceMock: Device = {
  id: 1,
  name: 'The First',
  meals: [
    {
      time: '08:10',
      weight: 200,
    },
    {
      time: '10:45',
      weight: 100,
    },
    {
      time: '14:30',
      weight: 50,
    },
    {
      time: '17:20',
      weight: 50,
    },
    {
      time: '21:25',
      weight: 200,
    },
  ],
  realTimeWeight: '83.7',
};

export default deviceMock;
