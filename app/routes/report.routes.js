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

module.exports = reportRouter;
