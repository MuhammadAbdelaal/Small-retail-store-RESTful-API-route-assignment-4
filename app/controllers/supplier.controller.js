const supplierService = require("../services/supplier.service");

// create supplier controller/handler
async function createSupplier(req, res, next) {
  // get supplier data from request body
  const { SupplierName, ContactNumber } = req.body;

  // if no contact number provided, return 400 bad request error
  if (!ContactNumber) {
    return res.status(400).json({
      error: "Contact number is required.",
    });
  }
  // call create supplier service
  try {
    const supplier = await supplierService.createSupplier(
      SupplierName,
      ContactNumber,
    );
    return res.status(201).json({
      message: "Supplier created successfully with the following details:",
      success: true,
      supplier: {
        SupplierID: supplier.insertId,
        SupplierName,
        ContactNumber,
      },
    });
  } catch (err) {
    return res.status(404).json({
      error: "Error creating supplier",
      success: false,
      details: err.message,
    });
  }
}

// get all suppliers controller/handler
async function getAllSuppliers(req, res, next) {
  try {
    // call the service to get all suppliers
    const suppliers = await supplierService.getAllSuppliers();
    return res.status(200).json({
      message: "This is a list of all our Suppliers: ",
      success: true,
      suppliers: suppliers,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Error retrieving suppliers: ",
      success: false,
      details: err.message,
    });
  }
}

// update supplier controller/handler
async function updateSupplier(req, res, next) {
  const { id } = req.params;
  const { SupplierName, ContactNumber } = req.body || {};

  // if the request body is empty, data are not valid
  if (
    // if no data provided at all
    SupplierName === undefined &&
    ContactNumber === undefined
  ) {
    // return 400 (bad request)
    return res.status(400).json({
      error: `Supplier data is missing. Provide at least one field to update.`,
    });
  }

  // validate the contact number field is not coming as empty string
  // but, pass if it is not pvovided at all, and handle it and leave the current value as is
  // Only validate if ContactNumber was sent in the request body
  if (ContactNumber !== undefined) {
    // validate it is a valid phone number
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
    if (
      typeof ContactNumber !== "string" ||
      !ContactNumber.trim() ||
      !phoneRegex.test(ContactNumber.trim())
    ) {
      return res.status(400).json({
        error:
          "Contact number cannot be empty and must be a valid phone number.",
      });
    }
  }

  try {
    // when fields are good to go, call the service to update the supplier
    const supplier = await supplierService.updateSupplier(
      id,
      SupplierName,
      ContactNumber,
    );

    return res.status(200).json({
      message: `Supplier with the ID: ${id} updated successfully with the following details:`,
      success: true,
      supplier: supplier,
    });
  } catch (err) {
    return res.status(404).json({
      error: "Error updating supplier",
      success: false,
      details: err.message,
    });
  }
}

// delete supplier controller/handler
async function deleteSupplier(req, res, next) {
  const { id } = req.params;

  try {
    // call the service to delete the supplier
    await supplierService.deleteSupplier(id);
    return res.status(200).json({
      message: `Supplier with the ID: ${id} deleted successfully.`,
      success: true,
    });
  } catch (err) {
    return res.status(404).json({
      error: "Error deleting supplier",
      success: false,
      details: err.message,
    });
  }
}

module.exports = {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
};
