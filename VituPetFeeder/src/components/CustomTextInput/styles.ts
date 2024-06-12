import { StyleSheet } from 'react-native';
import { CustomTextInputStyleProps } from '../../types/stylesProps';
import { windowPercentage } from '../../consts';

const styles = (props: CustomTextInputStyleProps) =>
  StyleSheet.create({
    inputContainer: {
      width:
        props.size &&
        props.width &&
        (windowPercentage[props.size] / 100) * props.width,
      borderBottomWidth: 1,
      borderBottomColor: '#80f2bd',
      flexDirection: 'row',
      justifyContent: props.centerAlign ? 'center' : 'space-between',
      marginVertical: 15,
    },
    textInput: {
      width: '85%',
    },
  });

export default styles;
