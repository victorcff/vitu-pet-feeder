import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#302f2f',
    paddingHorizontal: 15,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  warningIcon: {
    marginBottom: 50,
  },
  message: {
    fontWeight: 'bold',
    color: '#fffdfd',
    fontSize: 25,
    textAlign: 'center',
    lineHeight: 36,
    marginTop: 50,
  },
});

export default styles;
