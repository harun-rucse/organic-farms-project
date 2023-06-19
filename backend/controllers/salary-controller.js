const _ = require('lodash');
const { validateSalary, validateSalaryUpdate } = require('../models/salary-model');
const salaryService = require('../services/salary-service');
const employeeService = require('../services/employee-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all salaries
 * @route   GET /api/salaries
 * @access  Private(admin)
 */
const getAllSalaries = catchAsync(async (req, res, next) => {
  const allSalarys = await salaryService.getAllSalaries({}, req.query);
  const totalCount = await salaryService.getTotalCount();

  res.status(200).json({
    status: 'success',
    total: totalCount,
    result: allSalarys,
  });
});

/**
 * @desc    Get single salary
 * @route   GET /api/salaries/id
 * @access  Private(admin)
 */
const getOneSalary = catchAsync(async (req, res, next) => {
  const salary = await salaryService.getOneSalary({ _id: req.params.id });
  if (!salary) return next(new AppError('No salary found with this id.', 404));

  res.status(200).json(salary);
});

/**
 * @desc    Create new salary
 * @route   POST /api/salaries
 * @access  Private(admin)
 */
const createNewSalary = catchAsync(async (req, res, next) => {
  const { error } = validateSalary(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const employee = await employeeService.getOneEmployee({ _id: req.body.employee });
  if (!employee) return next(new AppError('No employee found with this id.', 404));

  req.body.branchOffice = employee.branchOffice._id;
  req.body.amount = employee.salary;
  req.body.createdBy = req.user._id;

  const payload = _.pick(req.body, [
    'month',
    'year',
    'employee',
    'paymentMethod',
    'status',
    'branchOffice',
    'amount',
    'createdBy',
  ]);
  const newSalary = await salaryService.createNewSalary(payload);

  res.status(201).json(newSalary);
});

/**
 * @desc    Update single salary
 * @route   PATCH /api/salaries/id
 * @access  Private(admin)
 */
const updateOneSalary = catchAsync(async (req, res, next) => {
  const { error } = validateSalaryUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  req.body.lastUpdatedBy = req.user._id;

  const payload = _.pick(req.body, ['month', 'year', 'paymentMethod', 'status', 'lastUpdatedBy']);
  const updateSalary = await salaryService.updateOneSalary({ _id: req.params.id }, payload);
  if (!updateSalary) return next(new AppError('No salary found with this id.', 404));

  res.status(200).json(updateSalary);
});

/**
 * @desc    Delete single salary
 * @route   DELETE /api/salaries/id
 * @access  Private(admin)
 */
const deleteOneSalary = catchAsync(async (req, res, next) => {
  const deleteSalary = await salaryService.deleteOneSalary({ _id: req.params.id });
  if (!deleteSalary) return next(new AppError('No salary found with this id.', 404));

  res.status(204).send();
});

module.exports = {
  getAllSalaries,
  getOneSalary,
  createNewSalary,
  updateOneSalary,
  deleteOneSalary,
};
