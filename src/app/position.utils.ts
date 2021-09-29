export const decToHex = (i: number) => i.toString(16);
export const isEnoughSpaceArround = (r: number, c: number) => {
  return !isFirstCol(c) && !isFirstRow(r) && !isLastCol(c) && !isLastRow(r);
};
export const isNoSpaceLeft = (r: number, c: number) => {
  return !isFirstRow(r) && !isLastRow(r) && isFirstCol(c);
};
export const isNoSpaceRight = (r: number, c: number) => {
  return !isFirstRow(r) && !isLastRow(r) && isLastCol(c);
};
export const isNoSpaceTop = (r: number, c: number) => {
  return !isFirstCol(c) && !isLastCol(c) && isFirstRow(r);
};
export const isNoSpaceBot = (r: number, c: number) => {
  return !isFirstCol(c) && !isLastCol(c) && isLastRow(r);
};
export const isFirstRow = (r: number) => {
  return r === 0;
};
export const isLastRow = (r: number) => {
  return r === 11;
};
export const isFirstCol = (c: number) => {
  return c === 0;
};
export const isLastCol = (c: number) => {
  return c === 11;
};

export const getValidCords = (
  limit: 'l' | 'r' | 't' | 'b' | 'none',
  r: number,
  c: number,
  orientation: 'h' | 'v' | 'none'
): string[] => {
  if (orientation === 'none') {
    switch (limit) {
      case 'l':
        return [
          decToHex(r - 1) + '_' + decToHex(c),
          decToHex(r + 1) + '_' + decToHex(c),
          decToHex(r) + '_' + decToHex(c + 1),
        ];
      case 'r':
        return [
          decToHex(r - 1) + '_' + decToHex(c),
          decToHex(r + 1) + '_' + decToHex(c),
          decToHex(r) + '_' + decToHex(c - 1),
        ];
      case 't':
        return [
          decToHex(r + 1) + '_' + decToHex(c),
          decToHex(r) + '_' + decToHex(c - 1),
          decToHex(r) + '_' + decToHex(c + 1),
        ];
      case 'b':
        return [
          decToHex(r - 1) + '_' + decToHex(c),
          decToHex(r) + '_' + decToHex(c - 1),
          decToHex(r) + '_' + decToHex(c + 1),
        ];
      case 'none':
        return [
          decToHex(r - 1) + '_' + decToHex(c),
          decToHex(r + 1) + '_' + decToHex(c),
          decToHex(r) + '_' + decToHex(c - 1),
          decToHex(r) + '_' + decToHex(c + 1),
        ];
    }
  } else {
    switch (limit) {
      case 'l':
        return orientation === 'h'
          ? [decToHex(r) + '_' + decToHex(c + 1)]
          : [
              decToHex(r - 1) + '_' + decToHex(c),
              decToHex(r + 1) + '_' + decToHex(c),
            ];
      case 'r':
        return orientation === 'h'
          ? [decToHex(r) + '_' + decToHex(c - 1)]
          : [
              decToHex(r - 1) + '_' + decToHex(c),
              decToHex(r + 1) + '_' + decToHex(c),
            ];
      case 't':
        return orientation === 'h'
          ? [
              decToHex(r) + '_' + decToHex(c - 1),
              decToHex(r) + '_' + decToHex(c + 1),
            ]
          : [decToHex(r + 1) + '_' + decToHex(c)];
      case 'b':
        return orientation === 'h'
          ? [
              decToHex(r) + '_' + decToHex(c - 1),
              decToHex(r) + '_' + decToHex(c + 1),
            ]
          : [decToHex(r - 1) + '_' + decToHex(c)];
      case 'none':
        return [];
    }
  }
};
