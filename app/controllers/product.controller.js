const productService = require("../services/product.service");

// create a product
async function createProduct(req, res, next) {
  // get product data from the request body
  const { ProductName, Price, StockQuantity, SupplierID } = req.body;
  const id = SupplierID || null;

  // if the request body is empty, or any of the required fields missing, or not valid
  if (
    !ProductName ||
    typeof Price !== "number" ||
    Price <= 0 ||
    typeof StockQuantity !== "number" ||
    StockQuantity < 0
  ) {
    // return 400 (bad request) error, and the error message
    return res.status(400).json({
      error: `Product data is missing or invalid.
        Product name, price, and stock quantity are required.
        Price and stock quantity must be numbers and greater than 0.`,
    });
  }

  // if fields are good to go, call the service to create the product
  try {
    const product = await productService.createProduct(
      ProductName,
      Price,
      StockQuantity,
      id,
    );
    return res.status(201).json({
      message: "Product created successfully with the following details:",
      product: {
        ProductID: product.insertId,
        ProductName,
        Price,
        StockQuantity,
        SupplierID: id,
      },
    });
  } catch (err) {
    return res.status(404).json({
      error: "Error creating product",
      details: err.message,
    });
  }
  //
}

// get all products
async function getAllProducts(req, res, next) {
  try {
    // call the service to get all products
    const products = await productService.getAllProducts();
    return res.status(200).json({
      message: "Here are all the products in our store: ",
      products: products,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Error retrieving products for the following reason: ",
      error: err.message,
    });
  }
}

// get a product by id
async function getProductById(req, res, next) {
  // obtain the product id from the request params
  const { id } = req.params;
  try {
    // call the service to get the product with the matching id
    const product = await productService.getProductById(id);

    // if found? return the product details
    return res.status(200).json({
      message: `Here is the product details with the ID: ${id}: `,
      product: product,
    });
  } catch (err) {
    // if not found, return 404 (not found) error
    return res.status(404).json({
      message: "Error retrieving product with the following reason: ",
      error: err.message,
    });
  }
}

// update a product
async function updateProduct(req, res, next) {
  // obtain the product id from the request params
  const { id } = req.params;

  // get product data provided
  const { ProductName, Price, StockQuantity, SupplierID } = req.body || {};

  // if the request body is empty, data are not valid
  if (
    // if no data provided at all
    ProductName === undefined &&
    Price === undefined &&
    StockQuantity === undefined &&
    SupplierID === undefined
  ) {
    // return 400 (bad request) error, and the error message
    return res.status(400).json({
      error: `Product data is missing. Provide at least one field to update.`,
    });
  }

  // validate the price is number and greater than 0
  if (Price !== undefined && Number(Price) <= 0) {
    return res.status(400).json({
      error: "Price must be a number greater than 0.",
    });
  }

  // validate the stock is a number and greater than or equal to 0
  if (StockQuantity !== undefined && Number(StockQuantity) < 0) {
    return res.status(400).json({
      error: "Stock quantity must be a number greater than or equal to 0.",
    });
  }

  // when fields are good to go, update the data in the database using COALESCE() db function
  try {
    // call the service to update the product
    const product = await productService.updateProduct(
      ProductName,
      Price,
      StockQuantity,
      SupplierID,
      id,
    );

    return res.status(200).json({
      message: `Product with the ID: ${id} updated successfully with the following details:`,
      product: product,
    });
  } catch (err) {
    return res.status(404).json({
      error: "Error updating product",
      details: err.message,
    });
  }
}

// delete a product
async function deleteProduct(req, res, next) {
  // obtain the product id from the request params
  const { id } = req.params;

  try {
    // call the service to delete the product
    await productService.deleteProduct(id);
    return res.status(200).json({
      message: `Product with the ID: ${id} deleted successfully.`,
    });
  } catch (err) {
    return res.status(404).json({
      error: "Error deleting product",
      details: err.message,
    });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
