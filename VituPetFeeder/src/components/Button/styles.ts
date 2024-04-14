import {StyleSheet} from 'react-native';
import {ButtonStyleProps} from '../../../../mobile/src/types/stylesProps';
import {buttonFontSize, windowPercentage} from '../../../../mobile/src/consts';

const styles = (props: ButtonStyleProps) =>
  StyleSheet.create({
    buttoncontainer: {
      width:
        props.size &&
        props.width &&
        (windowPercentage[props.size] / 100) * props.width,
      height:
        props.size &&
        props.width &&
        ((windowPercentage[props.size] / 100) * props.width) / 4.5,
      borderRadius:
        props.size &&
        props.width &&
        ((windowPercentage[props.size] / 100) * props.width) / 5 / 3,
      backgroundColor: '#0082fc',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonTitle: {
      fontSize: props.size && buttonFontSize[props.size],
      color: '#58fae1',
      fontWeight: 'bold',
    },
  });

export default styles;
