const reportRepository = require("../repositories/report.repository");

// retrieve total quantity sold per product
async function getTotalSoldPerProduct() {
  const totalSoldPerProduct = await reportRepository.dbGetTotalSoldPerProduct();
  return totalSoldPerProduct;
}

// get product with the highest stock quantity
async function getProductWithHighestStock() {
  const productWithHighestStock =
    await reportRepository.dbGetProductWithHighestStock();
  return productWithHighestStock;
}

module.exports = {
  getTotalSoldPerProduct,
  getProductWithHighestStock,
};
