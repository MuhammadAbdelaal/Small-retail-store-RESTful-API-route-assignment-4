const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const PORT = 3000;

app.use(express.json()); // parse json requests

// =============================================
// TODO: Task (1) Configure MySQl 2 connection
// and create the required database (if it does not exist)
// and create the Products, Suppliers, and Sales tables
// =============================================
const db = mysql.createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
});

async function dbInit() {
  try {
    await db.query("CREATE DATABASE IF NOT EXISTS retail_store");

    // define the the database to be used
    // I define it here to prevent the pool from throwing an error
    // when the database is not yet created
    await db.query("USE retail_store");

    await db.query(`
    CREATE TABLE IF NOT EXISTS Suppliers (
        SupplierID INT AUTO_INCREMENT PRIMARY KEY,
        SupplierName TEXT NOT NULL,
        ContactNumber TEXT
    );
    `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS Products (
        ProductID INT AUTO_INCREMENT PRIMARY KEY,
        ProductName TEXT NOT NULL,
        Price DECIMAL(10,2) NOT NULL,
        StockQuantity INT NOT NULL,
        SupplierID INT,
        FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID) ON DELETE SET NULL
    );
    `);
    await db.query(`
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

// Test the database connection
app.get("/test-db", async (req, res) => {
  try {
    const [result] = await db.query(`
        SELECT * FROM Products
        `);
    res.json({
      message: "Database connection successful",
      result: result[0] || "No data found in the DB",
    });
  } catch (err) {
    res.status(500).json({
      error: "Database connection failed",
      details: err.message,
    });
  }
});

// =============================================
// TODO: Task (2) Create REST API endpoints to perform CRUD operations for the Products table
// ● Create a product.
// ● Retrieve all products.
// ● Retrieve a product by ID.
// ● Update a product.
// ● Delete a product.
// =============================================

// =============================================
// TODO: Task (3) Create REST API endpoints to perform CRUD operations for the Suppliers table
// ● Create a supplier.
// ● Retrieve all suppliers.
// ● Update supplier information.
// ● Delete a supplier.
// =============================================

// =============================================
// TODO: Task (4) Create REST API endpoints to manage Sales
// ● Record a sale.
// ● Retrieve all sales.
// ● Retrieve sales for a specific product.
// =============================================

// =============================================
// TODO: Task (5) Create API endpoints to perform the following database modifications
// ● Add a Category column to the Products table.
// ● Remove the Category column.
// ● Change ContactNumber to VARCHAR(15).
// ● Add a NOT NULL constraint to ProductName.
// =============================================

// =============================================
// TODO: Task (6)
// Create an API endpoint or initialization script to insert the following data
// a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
// b. Insert the following three products, all provided by 'FreshFoods':
// i. 'Milk' with a price of 15.00 and stock quantity of 50.
// ii. 'Bread' with a price of 10.00 and stock quantity of 30.
// iii. 'Eggs' with a price of 20.00 and stock quantity of 40.
// c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
// =============================================

// =============================================
// TODO: Task (7) Create an API endpoint to update the price of 'Bread' to 25.00.
// =============================================

// =============================================
// TODO: Task (8) Create an API endpoint to delete the product 'Eggs'.
// =============================================

// =============================================
// TODO: Task (9)
// Create a reporting endpoint to retrieve the total quantity sold for each product
// using SQL aggregate functions.
// =============================================

// =============================================
// TODO: Task (10)
// Create a reporting endpoint to retrieve the product with the highest stock quantity.
// =============================================

// =============================================
// TODO: Task (11)
// Create a reporting endpoint to retrieve suppliers whose names start with 'F'
// =============================================

// =============================================
// TODO: Task (12)
// Create a reporting endpoint to retrieve all products that have never been sold.
// =============================================

// =============================================
// TODO: Task (13)
// Create a reporting endpoint to retrieve all sales including:
// ● Product name
// ● Quantity sold
// ● Sale date using SQL JOIN operations.
// =============================================

// =============================================
// TODO: Task (14)
// Create a SQL script or secure administrative endpoint to create
// a MySQL user named store_manager and grant the following permissions on all tables:
// ● SELECT
// ● INSERT
// ● UPDATE
// =============================================

// =============================================
// TODO: Task (15)
// Revoke the UPDATE permission from “store_manager”.
// =============================================

// =============================================
// TODO: Task (16)
// Grant DELETE permission to “store_manager” only on the Sales table..
// =============================================

//  Initiating the DB and starting the server
async function startServer() {
  try {
    await dbInit(); // initialize the database before starting the server

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Error in startServer: " + err.message);
  }
}
startServer();
