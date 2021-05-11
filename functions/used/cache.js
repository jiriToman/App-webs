const NodeCache = require("node-cache");
const myCache = new NodeCache();



  module.exports = {
    setCache: function(paramID, input) {
      myCache.set(paramID, input, 3600);
    },
    getCache: function(str) {
      return myCache.get(str);
    },
};