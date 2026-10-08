# Requirements

## Task (1)

Configure MySQl 2 connection and create the required database (if it does not exist) and create the Products, Suppliers, and Sales tables.

## Task (2)

Create REST API endpoints to perform CRUD operations for the Products table.

- Create a product.
- Retrieve all products.
- Retrieve a product by ID.
- Update a product.
- Delete a product.

## Task (3)

Create REST API endpoints to perform CRUD operations for the Suppliers table.

- Create a supplier.
- Retrieve all suppliers.
- Update supplier information.
- Delete a supplier.

## Task (4)

Create REST API endpoints to manage Sales.

- Record a sale.
- Retrieve all sales.
- Retrieve sales for a specific product.

## Task (5)

Create API endpoints to perform the following database modifications.

- Add a Category column to the Products table.
- Remove the Category column.
- Change ContactNumber to VARCHAR(15).
- Add a NOT NULL constraint to ProductName.

## Task (6)

Create an API endpoint or initialization script to insert the following data.

a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.

b. Insert the following three products, all provided by 'FreshFoods':
i. 'Milk' with a price of 15.00 and stock quantity of 50.
ii. 'Bread' with a price of 10.00 and stock quantity of 30.
iii. 'Eggs' with a price of 20.00 and stock quantity of 40.

c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.

## Task (7)

Create an API endpoint to update the price of 'Bread' to 25.00.

## Task (8)

Create an API endpoint to delete the product 'Eggs'.

## Task (9)

Create a reporting endpoint to retrieve the total quantity sold for each product using SQL aggregate functions.

## Task (10)

Create a reporting endpoint to retrieve the product with the highest stock quantity.

## Task (11)

Create a reporting endpoint to retrieve suppliers whose names start with 'F'.

## Task (12)

Create a reporting endpoint to retrieve all products that have never been sold.

## Task (13)

Create a reporting endpoint to retrieve all sales including:

- Product name
- Quantity sold
- Sale date using SQL JOIN operations.

## Task (14)

Create a SQL script or secure administrative endpoint to create a MySQL user named store_manager and grant the following permissions on all tables:

- SELECT
- INSERT
- UPDATE

## Task (15)

Revoke the UPDATE permission from “store_manager”.

## Task (16)

Grant DELETE permission to “store_manager” only on the Sales table.
