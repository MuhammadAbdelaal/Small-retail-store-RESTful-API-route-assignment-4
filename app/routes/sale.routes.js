const { Router } = require("express");
const saleRouter = Router();
const saleController = require("../controllers/sale.controller");

// ● Record a sale.
saleRouter.post("/", saleController.recordSale);

// ● Retrieve all sales.

saleRouter.get("/", saleController.retrieveAllSales);

// ● Retrieve sales for a specific product.
saleRouter.get("/product/:productId", saleController.retrieveSalesByProductId);

module.exports = saleRouter;
