

const cache = require("./cache");
const getRoute = require("./getRoute");
const prepareData = require("./prepareData");

const getBest = require("./getBest");


module.exports = async function (country, clang) {
    let routef = getRoute("");
    let object, data;
    if (cache.getCache(country) == undefined) {
      let cached = await cacheDefaultPrice(country);
      if (cached == false) {
        data = prepareData(
          null,
          clang,
          routef,
          country,
          null,
          "",
          "No response from server - Failed to receive country specific data"
        );
      }
    }
    object = fcache.getCache(country);
    object = getBest(object);
    console.log("def obj po pridani slevy: " + JSON.stringify(object));
    data = prepareData(
      object,
      clang,
      routef,
      country,
      null,
      null,
      null
    );
    return data;
  };
