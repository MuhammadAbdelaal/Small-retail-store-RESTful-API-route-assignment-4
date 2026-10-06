
-- suppliers table
CREATE TABLE Suppliers (
    SupplierID INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
    SupplierName TEXT NOT NULL,
    ContactNumber TEXT

)

-- products table
CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
    ProductName TEXT NOT NULL,
    Price DECIMAL NOT NULL,
    StockQuantity INT,
    SupplierID INT FOREIGN KEY REFERENCES Suppliers(SupplierID)
)

-- sales table
CREATE TABLE Sales (
    SaleID INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    QuantitySold INT NOT NULL,
    SaleDate DATE NOT NULL
)