const durToNum = require("../basic/durToNum");
// vybere nejlepsi soucasnou nabidku
module.exports = function (object) {
  let offers = [],x,days;
  var i = 0;
  let arr = object.availableProducts;
  for (x of arr) {
    // pro kazdou nabidku udelej
    days = durToNum(arr[i].period);
    if (days != "uknown duration") {
      //pokud neni cas predplatneho definovan vyradi ho z hledani slevy
      offers.push(arr[i].price / (days * arr[i].duration));
    }
    i++;
  }

  const bestOffer = offers.indexOf(Math.min(...offers));
  const worstOffer = offers.indexOf(Math.max(...offers));

  //vybere nejlepesi a nejhorsi nabidku z pole
  const discountB =
    (offers[worstOffer] - offers[bestOffer]) / offers[worstOffer];
  // spocita slevu = rozdil nejlepsi nejhorsi
  if (arr.length > 1) {
    //pokud je vice jak jedna nabidka tak prida slevu k nejlepsi - nelze porovnat s nicim
    object.availableProducts[bestOffer].discount = Math.floor(discountB * 100); // prida param discount na pozadovane misto puvodnim objektu
    return object;
  } else {
    return object;
  }
};
