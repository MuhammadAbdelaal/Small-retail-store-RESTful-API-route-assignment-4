const { db } = require("../../db/connection");

// create a supplier in the database
async function dbCreateSupplier(SupplierName, ContactNumber) {
  const query = `INSERT INTO Suppliers (SupplierName, ContactNumber)
        VALUES (?, ?)`;
  const [result] = await db.query(query, [SupplierName, ContactNumber]);

  return result;
}

// get a supplier by contact number
async function dbGetSupplierByContactNumber(ContactNumber) {
  const query = `SELECT * FROM Suppliers WHERE ContactNumber = ?`;
  const [result] = await db.query(query, [ContactNumber]);

  return result[0];
}

// get a supplier by ID
async function dbGetSupplierByID(id) {
  const query = `SELECT * FROM Suppliers WHERE SupplierID = ?`;
  const [result] = await db.query(query, [id]);

  return result[0];
}

// retrieve all suppliers from the database
async function dbGetAllSuppliers() {
  const [result] = await db.query(` SELECT * FROM Suppliers`);
  return result;
}

// update a supplier in the database
async function dbUpdateSupplier(supplierID, supplierName, contactNumber) {
  const query = `UPDATE Suppliers SET
        SupplierName = COALESCE(?, SupplierName),
        ContactNumber = COALESCE(?, ContactNumber)
        WHERE SupplierID = ?`;

  const [result] = await db.query(query, [
    supplierName,
    contactNumber,
    supplierID,
  ]);

  return result.affectedRows;
}

// delete a supplier from the database
async function dbDeleteSupplier(id) {
  const query = `DELETE FROM Suppliers WHERE SupplierID = ?`;
  const [result] = await db.query(query, [id]);

  return result.affectedRows;
}

module.exports = {
  dbCreateSupplier,
  dbGetSupplierByContactNumber,
  dbGetSupplierByID,
  dbGetAllSuppliers,
  dbUpdateSupplier,
  dbDeleteSupplier,
};
