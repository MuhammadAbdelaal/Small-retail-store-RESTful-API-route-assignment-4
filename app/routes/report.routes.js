const { Router } = require("express");
const reportController = require("../controllers/report.controller");

const reportRouter = Router();

// ● Retrieve total quantity sold per product.
reportRouter.get(
  "/products/total-sold",
  reportController.retrieveTotalSoldPerProduct,
);

// ● Retrieve product with the highest stock quantity.
reportRouter.get(
  "/products/highest-stock",
  reportController.retrieveProductWithHighestStock,
);

// ● Retrieve suppliers whose names start with 'F'.
reportRouter.get(
  "/suppliers/starting-with-f",
  reportController.retrieveSuppliersStartingWithF,
);

// ● Retrieve products that have never been sold.
reportRouter.get(
  "/products/never-sold",
  reportController.retrieveProductsNeverSold,
);

module.exports = reportRouter;
