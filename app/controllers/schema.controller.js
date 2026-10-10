const schemaService = require("../services/schema.service");

// ● Add a Category column to the Products table.
async function addCategoryColumn(req, res) {
  try {
    await schemaService.addCategoryColumn();
    return res
      .status(200)
      .json({ message: "Category column added to Products." });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// ● Remove the Category column.
async function removeCategoryColumn(req, res) {
  try {
    await schemaService.removeCategoryColumn();
    return res
      .status(200)
      .json({ message: "Category column removed from Products." });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// ● Change ContactNumber to VARCHAR(15).
async function changeContactNumberType(req, res) {
  try {
    await schemaService.changeContactNumberType();
    return res
      .status(200)
      .json({ message: "ContactNumber changed to VARCHAR(15)." });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// ● Add a NOT NULL constraint to ProductName.
async function makeProductNameNotNull(req, res) {
  try {
    await schemaService.makeProductNameNotNull();
    return res.status(200).json({ message: "ProductName is now NOT NULL." });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

module.exports = {
  addCategoryColumn,
  removeCategoryColumn,
  changeContactNumberType,
  makeProductNameNotNull,
};
