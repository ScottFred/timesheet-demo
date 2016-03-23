module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/timesheetdemo',
  session: {
    secret: process.env.SESSION_SECRET || '81e3dfc4-1655-455c-8cb3-464722be77c3',
    mongoUrl: process.env.SESSION_MONGO_URL || 'mongodb://localhost/timesheetdemosession'
  }
};