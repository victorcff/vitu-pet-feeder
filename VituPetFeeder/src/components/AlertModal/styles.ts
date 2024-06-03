import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1fc4',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#0ff31a',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    width: '80%',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  closeIconContainer: {
    alignSelf: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 38,
    color: '#0ff31a',
    marginBottom: 25,
    marginRight: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 20,
    color: '#3b3b3b',
    marginVertical: 15,
  },
  buttonGroupContainer: {
    justifyContent: 'space-between',
    height: '20%',
    width: '100%',
    alignItems: 'center',
  },
});

export default styles;
