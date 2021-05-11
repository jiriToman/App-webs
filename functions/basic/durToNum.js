module.exports = function (dur) {
  let durD;
  switch (dur) {
    case "day":
      durD = 1;
      break;
    case "week":
      durD = 7;
      break;
    case "month":
      durD = 30;
      break;
    case "year":
      durD = 365;
      break;
    default:
      durD = false;
  }

  if (durD == false) {
    return "uknown duration";
  } else {
    return durD;
  }
};
