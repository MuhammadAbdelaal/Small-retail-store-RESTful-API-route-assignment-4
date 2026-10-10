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

// get suppliers whose name starts with 'F'
async function getSuppliersStartingWithF() {
  const suppliersStartingWithF =
    await reportRepository.dbGetSuppliersStartingWithF();
  return suppliersStartingWithF;
}

// get products that have never been sold
async function getProductsNeverSold() {
  const productsNeverSold = await reportRepository.dbGetProductsNeverSold();
  return productsNeverSold;
}

module.exports = {
  getTotalSoldPerProduct,
  getProductWithHighestStock,
  getSuppliersStartingWithF,
  getProductsNeverSold,
};
