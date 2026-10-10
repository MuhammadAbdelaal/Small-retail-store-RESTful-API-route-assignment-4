const { pool } = require("../../db/connection");

// record/insert a sale in the database
async function dbInsertSale(conn, quantity, productId) {
  const query = `INSERT INTO Sales (QuantitySold, ProductID) VALUES (?, ?)`;
  const [result] = await conn.query(query, [quantity, productId]);
  return result.insertId;
}

// get sale by Id
async function dbGetSaleById(conn, saleId) {
  const query = `SELECT * FROM Sales WHERE SaleID = ?`;
  const [rows] = await conn.query(query, [saleId]);
  return rows[0];
}

//  get all sales.
async function dbGetAllSales() {
  const [result] = await pool.query(` SELECT * FROM Sales`);
  return result;
}

// get all sales for a specific product.
async function dbGetSalesByProductId(productId) {
  const query = `SELECT * FROM Sales WHERE ProductID = ?`;
  const [result] = await pool.query(query, [productId]);
  return result;
}

module.exports = {
  dbInsertSale,
  dbGetSaleById,
  dbGetAllSales,
  dbGetSalesByProductId,
};
