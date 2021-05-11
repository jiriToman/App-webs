const geoip = require("geoip-lite");

module.exports = function (ip) {
  let geo = geoip.lookup(ip);
  if (geo == null) {
    geo = { country: "US" };
  }
  return geo;
};
