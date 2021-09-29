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
        return [r - 1 + '_' + c, r + 1 + '_' + c, r + '_' + (c + 1)];
      case 'r':
        return [r - 1 + '_' + c, r + 1 + '_' + c, r + '_' + (c - 1)];
      case 't':
        return [r + 1 + '_' + c, r + '_' + (c - 1), r + '_' + (c + 1)];
      case 'b':
        return [r - 1 + '_' + c, r + '_' + (c - 1), r + '_' + (c + 1)];
      case 'none':
        return [
          r - 1 + '_' + c,
          r + 1 + '_' + c,
          r + '_' + (c - 1),
          r + '_' + (c + 1),
        ];
    }
  } else {
    switch (limit) {
      case 'l':
        return orientation === 'h'
          ? [r + '_' + (c + 1)]
          : [r - 1 + '_' + c, r + 1 + '_' + c];
      case 'r':
        return orientation === 'h'
          ? [r + '_' + (c - 1)]
          : [r - 1 + '_' + c, r + 1 + '_' + c];
      case 't':
        return orientation === 'h'
          ? [r + '_' + (c - 1), r + '_' + (c + 1)]
          : [r + 1 + '_' + c];
      case 'b':
        return orientation === 'h'
          ? [r + '_' + (c - 1), r + '_' + (c + 1)]
          : [r - 1 + '_' + c];
      case 'none':
        return [];
    }
  }
};
