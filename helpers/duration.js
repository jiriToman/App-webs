module.exports = function (period) {
  if (period == "day") {
    period = "day";
  } else if (period == "week") {
    period = "week";
  } else if (period == "month") {
    period = "month";
  } else if (period == "year") {
    period = "year";
  }
  return period;
};
