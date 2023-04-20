const fs = require('fs');
const path = require('path')
const config = require('../config')
const ResponseService = require('../services/response-service');
const DateHelper = require('../services/date-helper');

module.exports = async (req, res, next) => {
  const ipAddress = req.headers['x-forwarded-for'];
  if (!ipAddress) {
    ResponseService.error(res, 'No IP address provided');
    return;
  }

  // store request counter to file per day
  // TODO: use proper database
  const todayString = DateHelper.getDateString();
  const folderPath = path.join('mock-database', 'rate-limiter', ipAddress);
  const filePath = path.join(folderPath, todayString);

  let usageCounter = null;
  try {
    usageCounter = await fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
  } catch(error) {
    usageCounter = null;
  }

  // create new counter starting with 1 if this IP address is new for today
  if (usageCounter === null) {
    fs.mkdir(folderPath, async (err) => {
      if (err) console.log(err); // ignore if the folder already exists
      await fs.writeFileSync(filePath, "1");
    });
  } 
  // increase the counter by 1 if this Ip address is not new for today (could have block issue, that's why we need to use a database)
  // if it exceeds the threshold, stop the request
  else {
    if (usageCounter > config.dailyUsageLimit) {
      ResponseService.error(res, "Daily limit exceeded", 429);
      return;
    }

    await fs.writeFileSync(filePath, `${parseInt(usageCounter) + 1}`);
  }
  
  next();
}