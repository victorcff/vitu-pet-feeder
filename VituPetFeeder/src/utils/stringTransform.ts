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

export { fillStringWithWhiteSpace };
