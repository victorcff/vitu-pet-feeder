import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollViewContent: {
    justifyContent: 'space-between',
    height,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: '#80f2bd',
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 3,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#80f2bd',
  },
  footer: {
    marginBottom: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerTitle: {
    color: '#80f2bd',
    fontSize: 14,
    paddingLeft: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default styles;
