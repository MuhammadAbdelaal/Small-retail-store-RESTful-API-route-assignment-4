const express = require("express");
const { dbInit } = require("./db/connection");
const app = express();
const PORT = 3000;
const productRouter = require("./app/routes/product.routes");

app.use(express.json()); // middleware to parse json requests

// middleware to catch JSON parsing
app.use((err, req, res, next) => {
  if (err.status === 400) {
    // syntax errors come with status code 400
    return res.status(400).json({ message: "invalid json" });
  }
  next(err); // if it's not a syntax error, pass it to the next middleware if any
});

// Task (2) productRouter
app.use("/products", productRouter);

// =============================================
// TODO: Task (3) Create REST API endpoints to perform CRUD operations for the Suppliers table
// =============================================
// ● Create a supplier.
// ● Retrieve all suppliers.
// ● Update supplier information.
// ● Delete a supplier.

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
