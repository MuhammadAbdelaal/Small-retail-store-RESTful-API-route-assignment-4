const reportService = require("../services/report.service");

// ● Retrieve total quantity sold per product.
async function retrieveTotalSoldPerProduct(req, res, next) {
  try {
    // calling the service
    const report = await reportService.getTotalSoldPerProduct();
    return res.status(200).json({
      success: true,
      message: "Total quantity sold per product: ",
      report: report,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving total quantity sold per product: ",
      success: false,
      details: err.message,
    });
  }
}

// ● Retrieve product with the highest stock quantity.
async function retrieveProductWithHighestStock(req, res, next) {
  try {
    // calling the service
    const report = await reportService.getProductWithHighestStock();
    return res.status(200).json({
      success: true,
      message: "Product with the highest stock quantity: ",
      report: report,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving product with the highest stock quantity.",
      success: false,
      details: err.message,
    });
  }
}

// ● Retrieve suppliers whose names start with 'F'.
async function retrieveSuppliersStartingWithF(req, res, next) {
  try {
    // calling the service
    const report = await reportService.getSuppliersStartingWithF();
    return res.status(200).json({
      success: true,
      message: "Suppliers whose names start with 'F': ",
      report: report,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving suppliers whose names start with 'F'.",
      success: false,
      details: err.message,
    });
  }
}

module.exports = {
  retrieveTotalSoldPerProduct,
  retrieveProductWithHighestStock,
  retrieveSuppliersStartingWithF,
};
