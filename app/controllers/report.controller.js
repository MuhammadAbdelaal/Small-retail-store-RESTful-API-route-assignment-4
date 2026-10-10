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

module.exports = {
  retrieveTotalSoldPerProduct,
};
