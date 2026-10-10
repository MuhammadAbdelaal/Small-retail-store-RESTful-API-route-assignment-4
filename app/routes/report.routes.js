const { Router } = require("express");
const reportController = require("../controllers/report.controller");

const reportRouter = Router();

// ● Retrieve total quantity sold per product.
reportRouter.get("/total-sold", reportController.retrieveTotalSoldPerProduct);

module.exports = reportRouter;
