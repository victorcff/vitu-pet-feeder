import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#302f2f',
  },
  logoImage: {
    height: 0.3 * height,
    width: 0.3 * height,
  },
  textInput: {
    fontSize: 18,
  },
  createAccountLink: {
    color: '#eef280',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default styles;
