module.exports = function (promotion) {
  let route;
  if (promotion == "") {
    route = "pricing";
  } else {
    route = "pricing/" + promotion;
  }
  return route;
};
