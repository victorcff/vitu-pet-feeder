import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#302f2f',
  },
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    width,
    backgroundColor: '#80f2bd',
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    fontSize: 26,
    color: '#302f2f',
    fontWeight: 'bold',
  },
  timeInfoContainer: {
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#80f2bd',
  },
  timeTextInput: {
    color: '#80f2bd',
    fontSize: 32,
    flex: 0.2,
  },
  twoDots: {
    color: '#80f2bd',
    fontSize: 32,
  },
  weightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightTextInputContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#80f2bd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightTextInput: {
    fontSize: 32,
    color: '#80f2bd',
    flex: 0.3,
  },
  weightInputSuffix: {
    color: '#80f2bd',
    fontSize: 32,
  },
});

export default styles;
