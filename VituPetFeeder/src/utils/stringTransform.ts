import { isNumber, isString } from './checkTypes';

const fillStringWithWhiteSpace = (str: string, length: number) => {
  if (str.length === length) return str;
  else {
    let strFilled = str;
    while (strFilled.length < length) {
      strFilled += ' ';
    }
    return strFilled;
  }
};

const formatStringOrNumberToDecimalStr = (
  value: string | number,
  decimalPrecision: number = 2,
) => {
  if (isString(value)) {
    return parseFloat(value).toFixed(decimalPrecision).toString();
  }
  if (isNumber(value)) {
    return value.toFixed(decimalPrecision).toString();
  }
  return '';
};

export { fillStringWithWhiteSpace, formatStringOrNumberToDecimalStr };
