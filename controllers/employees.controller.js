const data = {};
data.employees = require("../models/employees.json");

const getAllEmployess = (req, res) => {
  res.json(data.employees);
};

const getEmployeeById = (req, res) => {};

const createEmployee = (req, res) => {};

const updateEmployee = (req, res) => {};

const deleteEmployee = (req, res) => {};

module.exports = {
  getAllEmployess,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
