const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const PORT = 3000;

app.use(express.json()); // middleware to parse json requests
// middleware to catch JSON parsing
app.use((err, req, res, next) => {
  if (err.status === 400) {
    // syntax errors come with status code 400
    return res.status(400).json({ message: "invalid json" });
  }
  next(err); // if it's not a syntax error, pass it to the next middleware if any
});

// =============================================
// TODO: Task (1) Configure MySQl 2 connection
// and create the required database (if it does not exist)
// and create the Products, Suppliers, and Sales tables
// =============================================
// create a connection pool to the database
const db = mysql.createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
});

// create the database and tables (only if they do not exist)
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

// // Test the database connection
// app.get("/test-db", async (req, res) => {
//   try {
//     const [result] = await db.query(`
//         SELECT * FROM Products
//         `);
//     res.status(200).json({
//       message: "Database connection successful",
//       result: result[0] || "No data found in the DB",
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "Database connection failed",
//       details: err.message,
//     });
//   }
// });

// =============================================
// TODO: Task (2) Create REST API endpoints to perform CRUD operations for the Products table
// =============================================
// ● Create a product.
app.post("/products", async (req, res) => {
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

  // if fields are good to go, insert the data into the database
  try {
    const query = `INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
        VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [
      ProductName,
      Price,
      StockQuantity,
      id,
    ]);
    return res.status(201).json({
      message: "Product created successfully with the following details:",
      product: {
        ProductID: result.insertId,
        ProductName,
        Price,
        StockQuantity,
        SupplierID: id,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error creating product",
      details: err.message,
    });
  }
  //
});
// ● Retrieve all products.
app.get("/products", async (req, res) => {
  // get all products
  try {
    const [result] = await db.query(`
            SELECT * FROM Products
            `);
    return res.status(200).json({
      message: "Here are all the products in our store: ",
      products: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving products for the following reason: ",
      error: err.message,
    });
  }
});

// ● Retrieve a product by ID.
app.get("/products/:id", async (req, res) => {
  // obtain the product id from the request params
  const { id } = req.params;
  try {
    const query = `SELECT * FROM Products WHERE ProductID = ?`;

    const [result] = await db.query(query, [id]);

    // if no product found, return 404 (not found) error
    if (result.length === 0) {
      return res.status(404).json({
        message: `No product found with the ID: ${id}`,
      });
    }
    // if found? return the product details
    return res.status(200).json({
      message: `Here is the product details with the ID: ${id}: `,
      product: result[0],
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving product with the following reason: ",
      error: err.message,
    });
  }
});
// ● Update a product.
app.patch("/products/:id", async (req, res) => {
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

  // if any of the values not provided === undefined
  // convert undefined fields to null to skip updating them using COALESCE() db function
  const price = Price === undefined ? null : Price;
  const stockQuantity = StockQuantity === undefined ? null : StockQuantity;
  const productName = ProductName === undefined ? null : ProductName;
  const supplierID = SupplierID === undefined ? null : SupplierID;

  // when fields are good to go, update the data in the database using COALESCE() db function
  try {
    // construct the query
    const query = `UPDATE Products SET
        ProductName = COALESCE(?, ProductName),
        Price = COALESCE(?, Price),
        StockQuantity = COALESCE(?, StockQuantity),
        SupplierID = COALESCE(?, SupplierID)
        WHERE ProductID = ?`;

    // execute the query to update
    const [result] = await db.query(query, [
      productName,
      price,
      stockQuantity,
      supplierID,
      id,
    ]);

    // if no product updated, return 404 product not found
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `No product found with the ID: ${id}`,
      });
    }

    // if the product was updated, return the updated product details
    const [updatedProduct] = await db.query(
      "SELECT * FROM Products WHERE ProductID = ?",
      [id],
    );

    return res.status(200).json({
      message: `Product with the ID: ${id} updated successfully with the following details:`,
      product: updatedProduct[0],
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error updating product",
      details: err.message,
    });
  }
});

// ● Delete a product.
app.delete("/products/:id", async (req, res) => {
  // obtain the product id from the request params
  const { id } = req.params;

  try {
    // construct the query
    const query = `DELETE FROM Products WHERE ProductID = ?`;

    // execute the query
    const [result] = await db.query(query, [id]);

    // if no product found, return 404 (not found) error
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `No product found with the ID: ${id}`,
      });
    }
    // if found? return the product id
    return res.status(200).json({
      message: `Product with the ID: ${id} deleted successfully.`,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error deleting product",
      details: err.message,
    });
  }
});

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
