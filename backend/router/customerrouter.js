const express = require("express");

const router = express.Router();

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controller/customerController");

// Create
router.post("/", createCustomer);

// Get all
router.get("/", getCustomers);

// Get one customer
router.get("/:id", getCustomerById);

// Update
router.put("/:id", updateCustomer);

// Delete
router.delete("/:id", deleteCustomer);

module.exports = router;
