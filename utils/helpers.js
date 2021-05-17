const moment = require("moment");

module.exports = {
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
  format_date: (datatime) => {
    return moment(datatime).format("MMM Do YY");
  },
};
