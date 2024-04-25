import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#302f2f',
    paddingHorizontal: 15,
  },
  reloadIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  wifiStatusIndicatorIcon: {
    marginBottom: 20,
  },
  message: {
    marginTop: 30,
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 36,
    color: '#e4e4e4',
  },
  passwordContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  apPassword: {
    fontWeight: 'bold',
    color: '#fffdfd',
    fontSize: 25,
    marginRight: 20,
  },
});

export default styles;
