module.exports = {
  arrayToObject: (arr, val) => {
    const newObj = {};
    arr.forEach((item) => {
      newObj[item] = { ...val };
    });
    return newObj;
  },
};
