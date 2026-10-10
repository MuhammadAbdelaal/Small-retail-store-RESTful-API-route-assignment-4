const saleService = require("../services/sale.service");

// ● Record a sale.
async function recordSale(req, res, next) {
  const { Quantity, ProductID } = req.body;

  // first: validate the data
  // is quantity is a valid integer? and greater than 0
  if (!Number.isInteger(Quantity) || Quantity <= 0) {
    return res.status(400).json({
      error: "Quantity must be a valid number greater than 0.",
    });
  }
  // is the ProductID a valid integer? and greater than 0
  if (!Number.isInteger(ProductID) || ProductID <= 0) {
    return res
      .status(400)
      .json({ message: "ProductID must be a valid number greater than 0." });
  }

  try {
    // try record the sale service
    const sale = await saleService.recordSale(ProductID, Quantity);
    // if good, return 201 created response with sale details
    return res.status(201).json({
      message: "Your sale created successfully with the following details:",
      sale: sale,
    });
  } catch (err) {
    // if not, catch the error and return 404 not found response with error message
    return res.status(404).json({
      error: "Error creating sale",
      details: err.message,
    });
  }
}

// ● Retrieve all sales.
async function retrieveAllSales(req, res, next) {
  try {
    // call the service to get all sales
    const sales = await saleService.getAllSales();
    return res.status(200).json({
      message: "Here is a list of all the sales: ",
      sales: sales,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving sales: ",
      error: err.message,
    });
  }
}

// ● Retrieve sales for a specific product.
async function retrieveSalesByProductId(req, res, next) {
  // obtain the product id from the request params
  const productId = Number(req.params.productId);

  // validate productId is valid number
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      message: "Product ID is required and must be number greater than 0.",
    });
  }
  try {
    // call the service to get all sales for the product
    const sales = await saleService.getSalesByProductId(productId);
    return res.status(200).json({
      message: `Product with ID: ${productId} has the following sales:`,
      sales: sales,
    });
  } catch (err) {
    return res.status(404).json({
      message: `Error retrieving sales:`,
      error: err.message,
    });
  }
}

module.exports = {
  recordSale,
  retrieveAllSales,
  retrieveSalesByProductId,
};
