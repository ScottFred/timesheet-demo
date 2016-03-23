module.exports = {
  mongoConnectionString: process.env.MONGOLAB_URI || 'localhost:27017',
  sessionSecret: 'timesheetdemosessionsecret'
};