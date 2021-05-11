const durToNum = require("./durToNum");

module.exports = async function insertDefault(defarr, prom, duration, i) {
  let match = defarr.filter((obj) => obj.period === duration)[0];
//pokud je trial duration lepsi bez defaultni nabidka
  if (
    durToNum(prom.availableProducts[i].trialPeriod) *
      prom.availableProducts[i].trialDuration >
    durToNum(match.trialPeriod) * match.trialDuration
  ) {
    prom.availableProducts[i].defTrialDuration = match.trialDuration;
    prom.availableProducts[i].defTrialPeriod = match.trialPeriod;
  }
//pokud je cena lepsi bez defaultni nabidka
  if (prom.availableProducts[i].price < match.price) {
    prom.availableProducts[i].defPrice = match.price;
  }
};
