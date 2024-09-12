const moment = require('moment');

module.exports = {
  formatDate: function(date, format) {
    if (!date) return '';
    return moment(date).format(format);
  }
};