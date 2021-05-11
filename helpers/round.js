module.exports = function (number, country) {
  if (country == "CZ") {
    number = Math.round(number);
  } else {
    number = Math.round(number * 100) / 100;
  }
  return number;
};
