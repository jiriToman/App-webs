module.exports = function (object, lang, route, country, promotion, err, errstring) {
    let data;
    if (object == null) {
      if (promotion == null) {
        data = {
          error: errstring + err,
          lang: lang,
          route: route,
          countryCode: country,
        };
      } else {
        data = {
          error: errstring + err,
          lang: lang,
          route: route,
          promotion: promotion,
          countryCode: country,
        };
      }
    } else {
      if (promotion == null) {
        data = {
          offers: object,
          lang: lang,
          route: route,
          countryCode: country,
        };
      } else {
        data = {
          offers: object,
          lang: lang,
          route: route,
          promotion: promotion,
          countryCode: country,
        };
      }
    }
    return data;
  };