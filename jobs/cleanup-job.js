const CronJob = require("node-cron");

exports.run = async () => {
  const job = CronJob.schedule("*/1 * * * *", async () => {
    console.log("I'm executed on a schedule!");
  });

  job.start();
}
