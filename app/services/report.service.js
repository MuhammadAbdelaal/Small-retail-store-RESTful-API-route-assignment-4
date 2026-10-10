const reportRepository = require("../repositories/report.repository");

// retrieve total quantity sold per product
async function getTotalSoldPerProduct() {
  const totalSoldPerProduct = await reportRepository.dbGetTotalSoldPerProduct();
  return totalSoldPerProduct;
}

module.exports = {
  getTotalSoldPerProduct,
};
