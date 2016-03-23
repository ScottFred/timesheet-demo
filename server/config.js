module.exports = {
  mongoConnectionString: process.env.MONGOLAB_URI || 'mongodb://localhost/timesheetdemo',
  sessionSecret: 'timesheetdemosessionsecret'
};