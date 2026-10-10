const productRepository = require("../repositories/product.repository");

// // create a product
async function createProduct(ProductName, Price, StockQuantity, SupplierID) {
  const product = await productRepository.dbCreateProduct(
    ProductName,
    Price,
    StockQuantity,
    SupplierID,
  );

  return product;
}

// get all products
async function getAllProducts() {
  const products = await productRepository.dbGetAllProducts();
  if (!products) {
    throw new Error("No products found");
  }
  return products;
}

// get a product by id
async function getProductById(id) {
  const product = await productRepository.dbGetProductById(id);
  // if no product found, throw error
  if (!product) {
    throw new Error(`No product found with the ID: ${id}`);
  }
  return product;
}

// update a product
async function updateProduct(
  productName,
  price,
  stockQuantity,
  supplierID,
  id,
) {
  // if any of the values not provided === undefined
  // convert undefined fields to null to skip updating them using COALESCE() db function
  const ProductName = productName === undefined ? null : productName;
  const Price = price === undefined ? null : price;
  const StockQuantity = stockQuantity === undefined ? null : stockQuantity;
  const SupplierID = supplierID === undefined ? null : supplierID;

  // update the product in the database
  const isUpdated = await productRepository.dbUpdateProduct(
    ProductName,
    Price,
    StockQuantity,
    SupplierID,
    id,
  );

  // if no product updated, throw error
  if (!isUpdated) {
    throw new Error(`No product found with the ID: ${id}`);
  }

  // if the product was updated, return the updated product details
  const product = productRepository.dbGetProductById(id);

  return product;
}

// delete a product
async function deleteProduct(id) {
  // delete the product from the database
  const isDeleted = await productRepository.dbDeleteProduct(id);

  // if no product deleted, throw error
  if (!isDeleted) {
    throw new Error(`No product found with the ID: ${id}`);
  }

  return true;
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
