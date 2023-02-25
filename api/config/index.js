const ENV = process.env.NODE_ENV;

module.exports =
  ENV === 'production' ? require('./prod.config') : ENV === 'test' ? require('./test.config') : require('./dev.config');
