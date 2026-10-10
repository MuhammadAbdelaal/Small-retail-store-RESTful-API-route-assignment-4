const express = require("express");
const { dbInit } = require("./db/connection");
const app = express();
const PORT = 3000;
const productRouter = require("./app/routes/product.routes");
const supplierRouter = require("./app/routes/supplier.routes");
const salesRouter = require("./app/routes/sale.routes");
const schemaRouter = require("./app/routes/schema.routes");
const reportRouter = require("./app/routes/report.routes");

// middleware to parse json requests
app.use(express.json());

// middleware to catch JSON parsing errors
app.use((err, req, res, next) => {
  if (err.status === 400) {
    // syntax errors come with status code 400
    return res.status(400).json({ message: "invalid json" });
  }
  next(err); // if it's not a syntax error, pass it to the next middleware if any
});

// Task (2) Create REST API endpoints to perform CRUD operations for the Products table.
// Task (7) Create an API endpoint to update the price of 'Bread' to 25.00.
// Task (8) Create an API endpoint to delete the product 'Eggs'.
app.use("/products", productRouter);

// Task (3) Create REST API endpoints to perform CRUD operations for the Suppliers table.
app.use("/suppliers", supplierRouter);

// Task (4) Create REST API endpoints to manage Sales
app.use("/sales", salesRouter);

// Task (5) Create API endpoints to perform the following database modifications
app.use("/schema", schemaRouter);

// Task (6)
// initialization scripts added to ./migration/data-v1.sql
// and implemented/tested through phpmyadmin

// Task (9) endpoint to retrieve the total quantity sold for each product
// Task (10) reporting endpoint to retrieve the product with the highest stock
// Task (11) reporting endpoint to retrieve suppliers whose names start with 'F'
// Task (12) reporting endpoint to retrieve all products that have never been sold.
app.use("/reports", reportRouter);

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
