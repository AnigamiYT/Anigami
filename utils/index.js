/* eslint-disable import/prefer-default-export */
export const arrayToObject = (arr, val) => {
  const newObj = {};
  arr.forEach((item) => {
    newObj[item] = { ...val };
  });
  return newObj;
};
