const express = require("express");

const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-node-fs-backend");

const hbs = require("hbs");

const cookieParser = require("cookie-parser");

const environment = process.env.NODE_ENV;
const appName = process.env.APP_NAME;

const helpers = require("require-all")(__dirname + "/helpers");
Object.keys(helpers).forEach((name) => {
  hbs.registerHelper(name, helpers[name]);
});
const functions = require("require-all")(__dirname + "/functions/used");
const middleware = require("require-all")(__dirname + "/middleware");

var MobileDetect = require("mobile-detect");

router = require("express").Router();
const app = express();
const port = process.env.PORT || 8000;
var path = require("path");

const geoip = require("geoip-lite");
const Parse = require("./functions/basic/parse");
//CTENI DAT Z CONFIGU via getConfig
const langA = functions.getConfig.getLang(); //pritomne jazyky bez en
const langAll = functions.getConfig.getLangAll(); //pridani en
console.log(functions.getConfig.full());
const blogKey = "blogPreview";

var clang;
var slang;
var promotion = [];

Parse.initialize(functions.getConfig.getName());
Parse.serverURL = functions.getConfig.getApiUrl();
app.use(
  i18nextMiddleware.handle(i18next, {
    removeLngFromUrl: false,
  })
);
app.use(cookieParser());

function sLang(req, res, next) {
  slang = req.acceptsLanguages(...langAll);

  if (langAll.includes(req.params.lang)) {
    req.i18n.changeLanguage(req.params.lang);
    console.log("lang set to " + req.params.lang);
  } else if (langA.includes(slang)) {
    req.i18n.changeLanguage(slang);
  } else {
    req.i18n.changeLanguage("en");
  }
  next();
}

function gLang(req, res, next) {
  slang = req.acceptsLanguages(...langAll);
  if (langAll.includes(req.params.lang)) {
    clang = req.params.lang;
  } else if (langA.includes(slang)) {
    clang = slang;
  } else {
    clang = "en";
  }

  next();
}

function utm(req, res, next) {
  if (!req.query.utm_source) {
  } else {
    const utm_source = req.query.utm_source;
    const utm_medium = req.query.utm_medium;
    const utm_campaign = req.query.utm_campaign;
    res.cookie("utmSource", utm_source, { maxAge: 86400000 });
    res.cookie("utmMedium", utm_medium, { maxAge: 86400000 });
    res.cookie("utmCampaign", utm_campaign, { maxAge: 86400000 });
  }
  next();
}

//----------------------------------------------------
// pridani podprostoru jazykovych prekladu pro homepage
i18nextMiddleware.addRoute(
  i18next,
  "/:lng/key-to-translate",
  langAll,
  router,
  "get",
  [
    utm,
    async function (req, res) {
      if (functions.getConfig.getName() == "bibino") {
        let data,
          cLang = req.url;
        langAll.forEach((lang) => {
          cLang = functions.clipAfter(cLang, lang);
        });
        cLang = cLang.replace("/", "");
        console.log("curlang is: " + cLang + " vs " + req.url);
        if (functions.cache.getCache(blogKey) == undefined) {
          data = await functions.cacheBlog();
        } else {
          data = functions.cache.getCache(blogKey);
        }
        console.log(data);
        res.render("index", { blog: data, lang: cLang });
      } else {
        res.render("index");
      }
    },
  ]
);

app.use(["/", "/?*"], router);
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    detection: {
      order: ["path"],
      lookupPath: "lng",
    },
    backend: {
      loadPath:
        __dirname + functions.getConfig.getRoot() + "/locales/{{lng}}/{{ns}}.json",
      addPath:
        __dirname +
        functions.getConfig.getRoot() +
        "/locales/{{lng}}/{{ns}}.missing.json",
    },
    fallbackLng: "en",
    preload: langAll,
    saveMissing: true,
  });
// loading non html resources
app.use(express.static("." + functions.getConfig.getRoot() + "/resources"));
app.use(express.static("." + functions.getConfig.getRoot() + "/favicon"));
app.use(express.static("." + functions.getConfig.getRoot() + "/SEO"));

// helpery pracujici s instanci i18next neexportuji
hbs.registerPartials(
  __dirname + functions.getConfig.getRoot() + "/views/partials",
  function (err) {}
);
hbs.registerPartials(__dirname + "/commons/partials", function (err) {});

hbs.registerHelper("i18next", function (str, lang) {
  return i18next.t(str, { lng: lang });
});
hbs.registerHelper("i18nextP", function (str, count, lang) {
  return i18next.t(str, { count: count, lng: lang });
});

hbs.registerHelper("changelng", function (route) {
  let langparams = [...langAll];
  let langparamsII = [...langAll];
  for (var i = 0; i < langparams.length; i++) {
    langparams[i] = "/" + langparams[i];
  }
  for (var i = 0; i < langparamsII.length; i++) {
    langparamsII[i] = "/" + langparamsII[i] + "/";
  }
  if (route.includes("/undefined")) {
    route = route.replace("/undefined", "");
  }
  // console.log(langparams);
  if (langparamsII.some((v) => route.includes(v))) {
    route = route.substring(4);
  } else if (langparams.some((v) => route.includes(v))) {
    route = route.substring(3);
  } else if (route.includes("//")) {
    route = route.replace("//", "/");
  } else if (route.startsWith("/")) {
    route = route.substring(1);
  } else {
  }
  langparams = [];
  langparamsII = [];
  return route;
});

hbs.registerHelper("environment", () => {
  return environment === "test";
});

function setCountryCodeHelper(countryCode) {
  hbs.registerHelper("countryCode", () => {
    return countryCode;
  });
}

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, functions.getConfig.getRoot() + "/views"));

app.get(
  functions.getConfig.getRoot() + "/locales/resources.json",
  i18nextMiddleware.getResourcesHandler(i18next)
);
app.get("/", [utm, middleware.redirectPage(""), sLang], async (req, res) => {
  if (functions.getConfig.getName() == "bibino") {
    let data,
      cLang = clang;
    if (functions.cache.getCache(blogKey) == undefined) {
      data = await functions.cacheBlog();
    } else {
      data = functions.cache.getCache(blogKey);
    }
    console.log(data);
    res.render("index", { blog: data, lang: cLang });
  } else {
    res.render("index");
  }
});

app.get(["/:lang/account*"], [sLang], (req, res) => {
  page = "account";
  res.render("account", { route: req.originalUrl });
});

app.get(["/account*"], [middleware.redirectPage("account")], (req, res) => {
  page = "account";
  res.render("account", { route: req.originalUrl });
});

app.get(["/gift-card*", "/:lang/gift-card*"], sLang, (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const { country } = functions.getCountry(ip);
  setCountryCodeHelper(country);
  page = "gift-card";
  res.render("gift-card", { route: req.originalUrl });
});

app.get(["/redeem*", "/:lang/redeem*"], [sLang, gLang], async (req, res) => {
  req.query.code
    ? res.redirect(`/${clang}/gift-card/redeem-gift?code=${req.query.code}`)
    : res.redirect(`/${clang}/gift-card/redeem-gift`);
});

app.get("/blog*", (req, res) => {
  page = "blog";
  res.render("blog", { blogUrl: req.originalUrl });
});

app.get("/comparison", sLang, (req, res, next) => {
  if (functions.getConfig.getName() == "barkio") {
    page = "comparison";
    res.render("comparison");
  } else {
    res.redirect("/");
  }
});

app.get("/terms", (req, res) => {
  page = "terms";
  res.render("terms");
});

app.get("/confirmation", (req, res) => {
  page = "confirmation";
  res.render("confirmation");
});

app.get("/confirmation-newsletter", (req, res) => {
  if (functions.getConfig.getName() == "barkio") {
    page = "confirmation-newsletter";
    res.render("confirmation-newsletter");
  } else {
    res.redirect("/");
  }
});

app.get(["/:lang/download", "/download"], [sLang], (req, res) => {
  page = "download";
  res.render("download", { route: "download"});
});

app.get("/mobile-qr-download", (req, res) => {
  //sem se dostanou pres qr na down strance - redirect na mobilni store
  var md = new MobileDetect(req.headers["user-agent"]);
  if (md.is("iPhone") === true) {
    res.redirect(functions.getConfig.getAppstoreUrl());
  } else {
    res.redirect(functions.getConfig.getGooglePlayUrl());
  }
});

app.get("/download-thanks", (req, res) => {
  // sem by se nikdy nemel dostat bez parametru co stahuje
  res.redirect("/download", { route: "download" });
});

app.get(
  ["/:lang/download-thanks/:type", "/download-thanks/:type"],
  sLang,
  (req, res) => {
    page = "downloadthx";
    res.render("downloadthx");
  }
);
app.get(
  ["/pricing/:promotion", "/:lang/pricing/:promotion"],
  [sLang, gLang],
  async (req, res) => {
    const cLang = clang;
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    promotion = [];
    promotion.unshift(req.params.promotion);
    console.log("promotion is" + promotion);
    // console.log('promotion upgrade is'+JSON.stringify(promotion));
    const offerid = await functions.priceCacheController(promotion, cLang, ip);
    console.log("resolvecache is " + JSON.stringify(offerid));
    if (offerid.redirect) {
      res.redirect("/" + clang + "/pricing");
    } else {
      res.render("pricing", offerid);
    }
  }
);

app.get(["/pricing", "/:lang/pricing"], [sLang, gLang], async (req, res) => {
  let cLang = clang;
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  promotion = [];
  const offerid = await functions.priceCacheController(promotion, cLang, ip);
  page = "pricing";
  res.render("pricing", offerid);
});

app.get("/console", (req, res) => {
  page = "console Switch";
  res.render("console", { app: appName });
});

app.get("/appnewsletter", (req, res) => {
  if (functions.getConfig.getName() == "barkio") {
    page = "appnewsletter";
    res.render("appnewsletter");
  } else {
    res.redirect("/");
  }
});

app.get("/phone-stand", (req, res) => {
  res.redirect(functions.getConfig.getYoutubeUrl());
});

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, async (err) => {
  console.log(`Server is listening on port ${port}`);
});
