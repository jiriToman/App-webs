const Parse = require("../basic/parse");

const cache = require("./cache");
const getRoute = require("./getRoute");
const prepareData = require("./prepareData");
const completePromo = require("./completePromo");
const getBest = require("./getBest");
const cacheDefault = require("./cacheDefaultPrice");

module.exports = async function (promotion, country, clang) {
  // returns prom or error from parse API and caches both promo and default if null
  let data, def, object, postvar;
  let routef = getRoute(promotion);
  if (promotion != null) {
    postvar = { promotions: [promotion], countryCode: country };
  } else {
    postvar = { countryCode: country };
  }
  try {
    //request
    const postParse = await Parse.Cloud.run(
      "getAvailableWebPurchases",
      postvar
    );
    object = postParse;

    // console.log("obj proma jak prijde: " + JSON.stringify(object));

    if (cache.getCache(country) == undefined) {
      let cached = await cacheDefault(country);
      if (cached == false) {
        data = prepareData(
          null,
          clang,
          routef,
          country,
          promotion,
          "",
          "No response from server - Failed to receive country specific data"
        );
      }
    }
    def = cache.getCache(country);
    object = await completePromo(def, object);
    if (object.availableProducts.length == 1) {
      object.special = Math.round(
        (1 -
          object.availableProducts[0].price /
            object.availableProducts[0].listPrice) *
          100
      );
    } else {
      console.log("wtf neni jen jedna nabidka");
    }
    cache.setCache(promotion + country, object);
    // ulozeni do cache
    object = cache.getCache(promotion + country);
    object = getBest(object); // pridani slevy do objektu - mozna pres ulozenim do cache? abych nevolal discount 2*
    console.log("obj proma po pridani slevy: " + JSON.stringify(object));
    data = prepareData(object, clang, routef, country, promotion, null, null);
  } catch (error) {
    //  pokud error od parse serveru tak servuj default a pridej error hlasku ze neni
    if (error.message == "Promotion unavailable." && error.code == 141) {
      if (cache.getCache(country) == undefined) {
        let cached = await cacheDefault(country);
        if (cached == false) {
          data = prepareData(
            null,
            clang,
            routef,
            country,
            promotion,
            "",
            "No response from server - Failed to receive country specific data and promotion is not available"
          );
        }
      }

      data = { redirect: true };
    } else {
      console.error("cacheParse err: " + error);
      data = prepareData(
        null,
        clang,
        routef,
        country,
        promotion,
        error,
        "No response from server - promotions: "
      );
    }
  }
  return data;
};
