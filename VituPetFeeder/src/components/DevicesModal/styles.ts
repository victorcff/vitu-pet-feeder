import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
    height: '70%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 22,
    position: 'absolute',
    bottom: -100
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: '#aeadad',
    borderRadius: 20,
    padding: 35,
    paddingBottom: 100,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 15,
  },
  modalMessage: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deviceItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deviceItemName: {
    fontSize: 20,
    color: '#f88930'
  },
  selectDeviceButton: {
    paddingVertical: 3,
    width: '50%',
    height: '90%',
    backgroundColor: '#1fed10',
    borderRadius: 15
  },
  selectButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1cfb4'
  }
})

export default styles