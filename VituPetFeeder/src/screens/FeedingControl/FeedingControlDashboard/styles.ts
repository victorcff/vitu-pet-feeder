import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    height,
    paddingTop: 20,
    alignItems: 'center',
  },
  deviceMajorInfo: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#302f2f59',
    padding: 10,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#302f2f59',
    elevation: 15,
    marginBottom: 25,
  },
  deviceName: {
    marginTop: 25,
    color: '#302f2f',
    fontSize: 50,
    fontWeight: 'bold',
  },
  realTimeWeightContainer: {
    alignItems: 'center',
    backgroundColor: '#302f2f',
    width: 0.6 * width,
    borderRadius: 40,
    paddingVertical: 15,
  },
  deviceRealTimeWeight: {
    color: '#eef280',
    fontSize: 32,
    marginTop: 10,
  },
  mealsButton: {
    height: 0.3 * height,
    width: 0.3 * height,
  },
});

export default styles;
