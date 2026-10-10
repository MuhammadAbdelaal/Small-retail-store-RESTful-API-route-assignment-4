// =============================================
// Task (1)
// =============================================

const mysql = require("mysql2/promise");

// Configure MySQl 2 connection
const pool = mysql.createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  dateStrings: true,
});

// create the database and tables (only if they do not exist)
async function dbInit() {
  try {
    await pool.query("CREATE DATABASE IF NOT EXISTS retail_store");

    // define the the database to be used
    // defined here to prevent the pool from throwing an error
    // when the database is not yet created
    await pool.query("USE retail_store");

    await pool.query(`
    CREATE TABLE IF NOT EXISTS Suppliers (
        SupplierID INT AUTO_INCREMENT PRIMARY KEY,
        SupplierName TEXT NOT NULL,
        ContactNumber TEXT
    );
    `);
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Products (
        ProductID INT AUTO_INCREMENT PRIMARY KEY,
        ProductName TEXT NOT NULL,
        Price DECIMAL(10,2) NOT NULL,
        StockQuantity INT NOT NULL,
        SupplierID INT,
        FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID) ON DELETE SET NULL
    );
    `);
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Sales(
        SaleID INT AUTO_INCREMENT PRIMARY KEY,
        QuantitySold INT NOT NULL,
        SaleDate DATE NOT NULL,
        ProductID INT,
        FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
    );
    `);
  } catch (err) {
    console.log("Error in dbInit: " + err.message);
  }
}

module.exports = {
  pool,
  dbInit,
};
