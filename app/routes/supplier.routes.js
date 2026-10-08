const { Router } = require("express");
const supplierController = require("../controllers/supplier.controller");

const supplierRouter = Router();

// ● Create a supplier route.
supplierRouter.post("/", supplierController.createSupplier);

// // ● Retrieve all suppliers route.
supplierRouter.get("/", supplierController.getAllSuppliers);

// // ● Update supplier information.
supplierRouter.patch("/:id", supplierController.updateSupplier);

// // ● Delete a supplier.
supplierRouter.delete("/:id", supplierController.deleteSupplier);

module.exports = supplierRouter;
