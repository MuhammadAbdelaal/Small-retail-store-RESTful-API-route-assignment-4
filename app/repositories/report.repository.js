const { pool } = require("../../db/connection");

// get total quantity sold
async function dbGetTotalSoldPerProduct() {
  const query = `SELECT Products.ProductID, Products.ProductName,
COALESCE(Suppliers.SupplierName, 'No supplier') AS Supplier,
       COALESCE(SUM(Sales.QuantitySold), 0) AS TotalQuantitySold
FROM Products
LEFT JOIN Sales ON Sales.ProductID = Products.ProductID
LEFT JOIN Suppliers ON Suppliers.SupplierID = Products.SupplierID
GROUP BY Products.ProductID, Products.ProductName, Suppliers.SupplierID;`;
  const [result] = await pool.query(query);
  return result;
}

module.exports = {
  dbGetTotalSoldPerProduct,
};
