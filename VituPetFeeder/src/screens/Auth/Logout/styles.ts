import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#302f2f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    height: 0.3 * height,
    width: 0.3 * height,
  },
});

export default styles;
