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
  // update the product in the database
  const isUpdated = await productRepository.dbUpdateProduct(
    productName,
    price,
    stockQuantity,
    supplierID,
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
