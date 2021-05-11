const config = require("../functions/used/getConfig");

module.exports = function (page) {
  return function (req, res, next) {
    langAll = config.getLang();
    langA = config.getLangAll();
    slang = req.acceptsLanguages(...langAll);
    if (page != "") {
      page = "/" + page;
    }
    if (langA.includes(slang)) {
      // is supported language
      if (!req.query.utm_source) {
        // no utm found
        console.log("no utm found");
        res.redirect("/" + slang + page);
      } else {
        res.redirect("/" + slang + req.originalUrl);
      }
    } else {
      req.i18n.changeLanguage("en");
    }
    next();
  };
};
