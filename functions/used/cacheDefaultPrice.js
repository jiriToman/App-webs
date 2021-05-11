const Parse = require("../basic/parse");

const cache = require("./cache");

module.exports = async function (country) {
  let success,
    postvar = { countryCode: country };
  try {
    let response = await Parse.Cloud.run("getAvailableWebPurchases", postvar);

    cache.setCache(country, response);
    // ulozeni do cache
    success = true;

    //data pro stranku bez promotion
  } catch (error) {
    success = false;
  }
  return success;
};
