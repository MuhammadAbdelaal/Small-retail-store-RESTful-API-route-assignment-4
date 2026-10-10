const { pool } = require("../../db/connection");

// add Category column to Products
async function dbAddCategoryColumn() {
  await pool.query(`ALTER TABLE Products ADD COLUMN Category VARCHAR(50)`);
}

// remove Category column from Products
async function dbRemoveCategoryColumn() {
  await pool.query(`ALTER TABLE Products DROP COLUMN Category`);
}

// change ContactNumber type to VARCHAR(15)
async function dbChangeContactNumberType() {
  await pool.query(
    `ALTER TABLE Suppliers MODIFY COLUMN ContactNumber VARCHAR(15) NOT NULL`,
  );
}

// add NOT NULL to ProductName
async function dbMakeProductNameNotNull() {
  await pool.query(
    `ALTER TABLE Products MODIFY COLUMN ProductName TEXT NOT NULL`,
  );
}

module.exports = {
  dbAddCategoryColumn,
  dbRemoveCategoryColumn,
  dbChangeContactNumberType,
  dbMakeProductNameNotNull,
};
