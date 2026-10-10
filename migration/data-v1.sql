

-- a. supplier
INSERT INTO Suppliers
 (SupplierName, ContactNumber) VALUES ('FreshFoods', '01001234567');

-- save the supplier id into mysql variable to use later
SET @supplierId = LAST_INSERT_ID();

-- b. products from FreshFoods
INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES
('Milk', 15.00, 50, @supplierId),
('Bread', 10.00, 30, @supplierId),
('Eggs', 20.00, 40, @supplierId);

-- c. record a sale of 2 Milk
INSERT INTO Sales (QuantitySold, SaleDate, ProductID)
VALUES (2, '2025-05-20', (SELECT ProductID FROM Products WHERE ProductName = 'Milk'));