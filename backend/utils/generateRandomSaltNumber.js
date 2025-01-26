const generateRandomSaltNumber = (min = 1, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  generateRandomSaltNumber,
};
