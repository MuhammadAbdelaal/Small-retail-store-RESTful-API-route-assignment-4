const { pool } = require("../../db/connection");

const SELECT_SALES_WITH_DETAILS = `
  SELECT Sales.SaleID, Sales.QuantitySold, Sales.SaleDate,
         Products.ProductID, Products.ProductName, Products.Price,
         Suppliers.SupplierID, Suppliers.SupplierName
  FROM Sales
  INNER JOIN Products ON Sales.ProductID = Products.ProductID
  LEFT JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID
`;

// record/insert a sale in the database
async function dbInsertSale(conn, quantity, productId) {
  const query = `INSERT INTO Sales (QuantitySold, ProductID) VALUES (?, ?)`;
  const [result] = await conn.query(query, [quantity, productId]);
  return result.insertId;
}

// get sale by Id
async function dbGetSaleById(conn, saleId) {
  const query = ` ${SELECT_SALES_WITH_DETAILS} WHERE Sales.SaleID = ?`;
  const [result] = await conn.query(query, [saleId]);
  return result[0];
}

//  get all sales.
async function dbGetAllSales() {
  const [result] = await pool.query(SELECT_SALES_WITH_DETAILS);
  return result;
}

// get all sales for a specific product.
async function dbGetSalesByProductId(productId) {
  const query = `${SELECT_SALES_WITH_DETAILS} WHERE Sales.ProductID = ?`;
  const [result] = await pool.query(query, [productId]);
  return result;
}

module.exports = {
  dbInsertSale,
  dbGetSaleById,
  dbGetAllSales,
  dbGetSalesByProductId,
};
