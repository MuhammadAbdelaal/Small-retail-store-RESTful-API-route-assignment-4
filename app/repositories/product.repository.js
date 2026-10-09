const { pool } = require("../../db/connection");

// create a product
async function dbCreateProduct(productName, price, stockQuantity, supplierID) {
  const query = `INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
        VALUES (?, ?, ?, ?)`;
  const [result] = await pool.query(query, [
    productName,
    price,
    stockQuantity,
    supplierID,
  ]);

  return result;
}

// get all products
async function dbGetAllProducts() {
  const [result] = await pool.query(` SELECT * FROM Products`);
  return result;
}

// get a product by id
async function dbGetProductById(id) {
  const query = `SELECT * FROM Products WHERE ProductID = ?`;
  const [result] = await pool.query(query, [id]);

  return result[0];
}

// update a product
async function dbUpdateProduct(
  productName,
  price,
  stockQuantity,
  supplierID,
  id,
) {
  const query = `UPDATE Products SET
        ProductName = COALESCE(?, ProductName),
        Price = COALESCE(?, Price),
        StockQuantity = COALESCE(?, StockQuantity),
        SupplierID = COALESCE(?, SupplierID)
        WHERE ProductID = ?`;

  const [result] = await pool.query(query, [
    productName,
    price,
    stockQuantity,
    supplierID,
    id,
  ]);

  return result.affectedRows;
}

// delete a product
async function dbDeleteProduct(id) {
  // execute the query
  const query = `DELETE FROM Products WHERE ProductID = ?`;
  const [result] = await pool.query(query, [id]);

  return result.affectedRows;
}

module.exports = {
  dbGetAllProducts,
  dbCreateProduct,
  dbGetProductById,
  dbUpdateProduct,
  dbDeleteProduct,
};
