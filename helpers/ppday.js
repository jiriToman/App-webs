const durToNum = require("../functions/basic/durToNum");

module.exports = function (dur, pri) {
  let durD, priD;
  durD=durToNum(dur);
  if (durD == "uknown subscriprion") {
    return "uknown subscriprion";
  } else {
    priD = pri / durD;
    return priD;
  }
};
