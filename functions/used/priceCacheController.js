
const cache = require("./cache");
const getRoute = require("./getRoute");
const prepareData = require("./prepareData");
const getCountry = require("./getCountry");
const getBest = require("./getBest");
const returnDefaultPrice = require("./returnDefaultPrice");
const returnPromotion = require("./returnPromotion");

module.exports = async function (promotion, clang, ip) {
    //zkontroluje cache pokud je prazdna zavola parse server jinak z ni nacte a vrati bud offers nebo error obj
    console.log("clangresolvecache nova:" + clang);
    let data,
      geo = getCountry(ip);
    if (promotion === []) {
      data = returnDefaultPrice(geo.country, clang);
    } else if (
      cache.getCache(promotion[0] + geo.country) == undefined
    ) {
      // pokud ma nacachovano nacte z cache
  
      data = returnPromotion(promotion[0], geo.country, clang);
    } else {
      let object = cache.getCache(promotion[0] + geo.country);
      object = getBest(object);
      var routef = getRoute(promotion[0]);
      data = prepareData(
        object,
        clang,
        routef,
        geo.country,
        promotion[0],
        null,
        null
      );
    }
    return data; // vrati obj data obsahuje request object a jazyk requestu
  };
