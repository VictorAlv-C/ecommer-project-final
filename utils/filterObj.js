const filterObj = (obj, ...attr) => {
  let newObj = {};

  Object.keys(obj).forEach((key) => {
    if (attr.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

module.exports = { filterObj };
