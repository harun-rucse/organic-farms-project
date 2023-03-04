const _ = require('lodash');
const { validateEmployee, validateEmployeeUpdate } = require('../models/employee-model');
const { validateUser, validateUserUpdate } = require('../models/user-model');
const employeeService = require('../services/employee-service');
const userService = require('../services/user-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all employees
 * @route   GET /api/emloyees
 * @access  Private(admin, branch-manager)
 */
const getAllEmployees = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'admin' ? {} : { branchOffice: req.user.branchOffice };
  const allEmployees = await employeeService.getAllEmployees(filter);

  res.status(200).json(allEmployees);
});

/**
 * @desc    Get single employee
 * @route   GET /api/employees/id
 * @access  Private(admin, branch-manager)
 */
const getOneEmployee = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const Employee = await employeeService.getOneEmployee(filter);
  if (!Employee) return next(new AppError('No employee found with this id.', 404));

  res.status(200).json(Employee);
});

/**
 * @desc    Create new employee
 * @route   POST /api/employees
 * @access  Private(admin, branch-manager)
 */
const createNewEmployee = catchAsync(async (req, res, next) => {
  const { error: userError } = validateUser(
    _.pick(req.body, ['name', 'address', 'phone', 'password', 'image', 'role', 'verified'])
  );
  const { error: employeeError } = validateEmployee(_.pick(req.body, ['salary', 'branchOffice']));

  if (userError) return next(new AppError(userError.details[0].message, 400));
  if (employeeError) return next(new AppError(employeeError.details[0].message, 400));
  if (!req.body.role) return next(new AppError('Role is required.', 400));

  req.body.createdBy = req.user._id;

  if (req.user.role !== 'admin') {
    req.body.branchOffice = req.user.branchOffice;
    delete req.body.verified;

    if (req.body.role === 'admin' || req.body.role === 'branch-manager') {
      return next(new AppError(`You are not authorized to create "${req.body.role}".`, 403));
    }
  }

  const payload = _.pick(req.body, [
    'name',
    'address',
    'phone',
    'password',
    'role',
    'image',
    'verified',
    'branchOffice',
    'salary',
    'createdBy',
  ]);
  const newEmployee = await employeeService.createNewEmployee(payload);

  res.status(201).json(newEmployee);
});

/**
 * @desc    Update single employee
 * @route   PATCH /api/employees/id
 * @access  Private(admin, branch-manager)
 */
const updateOneEmployee = catchAsync(async (req, res, next) => {
  const { error: userError } = validateUserUpdate(
    _.pick(req.body, ['name', 'address', 'phone', 'password', 'image', 'role', 'verified'])
  );
  const { error: employeeError } = validateEmployeeUpdate(_.pick(req.body, ['salary', 'branchOffice']));

  if (userError) return next(new AppError(userError.details[0].message, 400));
  if (employeeError) return next(new AppError(employeeError.details[0].message, 400));

  if (req.body.role === 'customer' || req.body.role === 'admin')
    return next(new AppError(`"${req.body.role}" is not allowed.`, 403));

  // Set lastUpdatedBy to the logged in user
  req.body.lastUpdatedBy = req.user._id;
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  if (req.user.role !== 'admin') {
    delete req.body.verified;
    delete req.body.branchOffice;

    if (req.body.role === 'branch-manager')
      return next(new AppError(`You are not authorized to update "${req.body.role}".`, 403));
  }

  const payload = _.pick(req.body, [
    'name',
    'address',
    'phone',
    'role',
    'image',
    'verified',
    'salary',
    'branchOffice',
    'lastUpdatedBy',
  ]);
  const updateEmployee = await employeeService.updateOneEmployee(filter, payload);
  if (!updateEmployee) return next(new AppError('No employee found with this id.', 404));

  res.status(200).json(updateEmployee);
});

/**
 * @desc    Delete single employee
 * @route   DELETE /api/employees/id
 * @access  Private(admin, branch-manager)
 */
const deleteOneEmployee = catchAsync(async (req, res, next) => {
  // Only admin can delete branch manager
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const employee = await employeeService.getOneEmployee(filter);
  if (!employee) return next(new AppError('No employee found with this id.', 404));

  const user = await userService.getOneUser({ _id: employee.user._id });

  if (req.user.role !== 'admin' && user.role === 'branch-manager') {
    return next(new AppError(`You are not authorized to delete "${user.role}".`, 403));
  }

  await employeeService.deleteOneEmployee(filter);

  res.status(204).send();
});

module.exports = {
  getAllEmployees,
  getOneEmployee,
  createNewEmployee,
  updateOneEmployee,
  deleteOneEmployee,
};
