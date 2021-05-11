const insertDefault = require("../basic/insertDefault");
// pripravi promotion pro pouziti 
module.exports = async function completePromo(def, prom) {
  let x,
    i = 0,
    defarr = def.availableProducts,
    arr = prom.availableProducts;

  for (x of arr) {
    // pro kazdou nabidku udelej

    switch (arr[i].period) {
      // prevedeni stringu doby predplatneho na cislo
      case "week":
        insertDefault(defarr, prom, "week", i);
        break;
      case "month":
        insertDefault(defarr, prom, "month", i);
        break;
      case "year":
        insertDefault(defarr, prom, "year", i);
        break;
      default:
        throw new Error("Promotion is not defined at website server");
    }
    i++;
  }
  return prom;
};
