const authRouter = require('../routes/auth-routes');
const branchRouter = require('../routes/branch-routes');
const globalErrorHandler = require('../controllers/error-controller');
const AppError = require('../utils/app-error');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/branches', branchRouter);

  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server.`, 404));
  });

  app.use(globalErrorHandler);
};
