const authRouter = require('../routes/auth-routes');
const branchRouter = require('../routes/branch-routes');
const farmerRouter = require('../routes/farmer-routes');
const employeeRouter = require('../routes/employee-routes');
const farmerCardRouter = require('../routes/farmer-card-routes');
const categoryRouter = require('../routes/category-routes');
const subCategoryRouter = require('../routes/subcategory-routes');
const productRouter = require('../routes/product-routes');
const reviewRouter = require('../routes/review-routes');
const salaryRouter = require('../routes/salary-routes');
const orderRouter = require('../routes/order-routes');
const globalErrorHandler = require('../controllers/error-controller');
const AppError = require('../utils/app-error');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/branches', branchRouter);
  app.use('/api/farmers', farmerRouter);
  app.use('/api/employees', employeeRouter);
  app.use('/api/farmer-cards', farmerCardRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/sub-categories', subCategoryRouter);
  app.use('/api/products', productRouter);
  app.use('/api/reviews', reviewRouter);
  app.use('/api/salaries', salaryRouter);
  app.use('/api/orders', orderRouter);

  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server.`, 404));
  });

  app.use(globalErrorHandler);
};
