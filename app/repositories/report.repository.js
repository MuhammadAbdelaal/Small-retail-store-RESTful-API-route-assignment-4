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

// product with the highest stock quantity
async function dbGetProductWithHighestStock() {
  const query = `
    SELECT ProductID, ProductName, StockQuantity
    FROM Products
    WHERE StockQuantity = (SELECT MAX(StockQuantity) FROM Products)
    `;
  const [result] = await pool.query(query);
  return result;
}

// supplier whose name starts with 'F'
async function dbGetSuppliersStartingWithF() {
  const query = `
    SELECT SupplierID, SupplierName, ContactNumber
    FROM Suppliers
    WHERE SupplierName LIKE 'F%'
    `;
  const [result] = await pool.query(query);
  return result;
}

module.exports = {
  dbGetTotalSoldPerProduct,
  dbGetProductWithHighestStock,
  dbGetSuppliersStartingWithF,
};
