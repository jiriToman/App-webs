const fs = require("fs");
const appName = process.env.APP_NAME;
const config = JSON.parse(fs.readFileSync(`config_${appName}.json`));

module.exports = {
  full: function () {
    return config;
  },
  getName: function () {
    return config.name;
  },
  getLang: function () {
    return config.lang;
  },
  getLangAll: function () {
    return  ["en"].concat(config.lang);
  },
  getApiUrl: function () {
    return config.apiUrl;
  },
  getRoot: function () {
    return config.routes.static;
  },
  getRoot: function () {
    return config.routes.static;
  },
  getAppStoreUrl: function () {
    return config.routes.linkA;
  },
  getGooglePlayUrl: function () {
    return config.routes.linkG;
  },
  getYoutubeUrl: function () {
    return config.routes.linkYT;
  },
};
