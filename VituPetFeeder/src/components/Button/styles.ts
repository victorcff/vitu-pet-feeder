import { StyleSheet } from 'react-native';
import { ButtonStyleProps } from '../../types/stylesProps';
import { buttonFontSize, windowPercentage } from '../../consts';

const styles = (props: ButtonStyleProps) =>
  StyleSheet.create({
    buttoncontainer: {
      position: props.bottom ? 'absolute' : 'relative',
      bottom: props.bottom ? 20 : undefined,
      width:
        props.size &&
        props.width &&
        (windowPercentage[props.size] / 100) * props.width,
      height:
        props.size &&
        props.width &&
        ((windowPercentage[props.size] / 100) * props.width) / 5.3,
      borderRadius:
        props.size &&
        props.width &&
        ((windowPercentage[props.size] / 100) * props.width) / 5 / 3,
      backgroundColor: '#eef280',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonTitle: {
      fontSize: props.size && buttonFontSize[props.size],
      color: '#191931',
      fontWeight: 'bold',
    },
  });

export default styles;
