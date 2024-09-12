const moment = require('moment-timezone');

module.exports = {
  formatDate: function(date, format) {
    if (!date) return '';
    // Set the timezone to Sydney, Australia
    return moment(date).tz('Australia/Sydney').format(format);
  }
};