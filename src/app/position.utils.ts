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
