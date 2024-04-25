import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#302f2f',
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 26,
    textAlign: 'center',
    lineHeight: 38,
    marginTop: 30,
    color: '#e4e4e4',
  },
  textInput: {
    fontSize: 18,
  },
});

export default styles;
