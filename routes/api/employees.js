const express = require("express");

const employeesController = require("../../controllers/employees.controller");

const router = express.Router();

const {
  getAllEmployess,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = employeesController;

router.route("/").get(getAllEmployess).post(createEmployee);

router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);
