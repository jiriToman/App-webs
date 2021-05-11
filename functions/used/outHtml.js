const showdown = require("showdown");
const converter = new showdown.Converter();
showdown.setOption("optionKey", "value");

const clipBefore = require("../basic/clipBefore");

module.exports = function (str) {
    let cls = '<p class= "four-lines-p" > ';

    str = converter.makeHtml(str);
    str = clipBefore(str, "</p>");
    str = str.replace(/\n/g, "");
    str = str.replace(/<.*?>/g, "");
    // str = str.replace(/<p>/g, cls);
    str = str.replace(/<p>/g, "");
  
    return str;
  };
  