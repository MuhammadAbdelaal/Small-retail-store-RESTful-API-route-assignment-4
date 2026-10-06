
-- suppliers table
CREATE TABLE Suppliers (
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierName TEXT NOT NULL,
    ContactNumber TEXT

)

-- products table
CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName TEXT NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT NOT NULL,
    SupplierID INT,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

-- sales table
CREATE TABLE Sales (
    SaleID INT AUTO_INCREMENT PRIMARY KEY,
    QuantitySold INT NOT NULL,
    SaleDate DATE NOT NULL,
    ProductID INT,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
)