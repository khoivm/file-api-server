class DateHelper {
  static getDateString(today = new Date()) {
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const date = ('0' + today.getDate()).slice(-2);
    return `${today.getFullYear()}${month}${date}`;
  }
}

module.exports = DateHelper;