import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});

export default styles;
