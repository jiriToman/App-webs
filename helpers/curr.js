module.exports = function (price, currency) {
  let data,
    values = {
      //true je vpravo,false vlevo
      CAD: { string: "CA$", position: false },
      AUD: { string: "A$", position: false },
      BRL: { string: "R$", position: false },
      HKD: { string: "HK$", position: false },
      MXN: { string: "MX$", position: false },
      TWD: { string: "元", position: false },
      NZD: { string: "NZ$", position: false },
      USD: { string: "$", position: false },
      CNY: { string: "CN¥", position: false },
      CZK: { string: "\xa0Kč", position: true },
      DKK: { string: "kr", position: true },
      ARS: { string: "AR$", position: false },
      EUR: { string: "€", position: true },
      HUF: { string: "Ft", position: true },
      INR: { string: "₹", position: false },
      JPY: { string: "¥", position: false },
      NOK: { string: "kr", position: false },
      PLN: { string: "zł", position: true },
      GBP: { string: "£", position: false },
      RUB: { string: "p.", position: true },
      SGD: { string: "SG$", position: false },
      ZAR: { string: "R", position: false },
      KRW: { string: "₩", position: false },
      SEK: { string: "kr", position: true },
    };
  if (values[currency].position == true) {
    data = price + values[currency].string;
    return data;
  } else {
    data = values[currency].string + price;
    return data;
  }
};
