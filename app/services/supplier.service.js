const supplierRepository = require("../repositories/supplier.repository");

// create a supplier: service
async function createSupplier(SupplierName, ContactNumber) {
  // check if the supplier already exists by contact number
  const exists =
    await supplierRepository.dbGetSupplierByContactNumber(ContactNumber);
  // if supplier found, throw error
  if (exists) {
    throw new Error(
      `Supplier with the contact number: ${ContactNumber} already exists.`,
    );
  }
  // if supplier not found, create the supplier
  const supplier = await supplierRepository.dbCreateSupplier(
    SupplierName,
    ContactNumber,
  );

  return supplier;
}

// retrieve all suppliers: service
async function getAllSuppliers() {
  const suppliers = await supplierRepository.dbGetAllSuppliers();
  return suppliers;
}

// update a supplier: service
async function updateSupplier(supplierID, supplierName, contactNumber) {
  // if any of the values not provided === undefined
  // convert undefined fields to null to skip updating them using COALESCE() db function
  const SupplierName = supplierName === undefined ? null : supplierName;
  const ContactNumber = contactNumber === undefined ? null : contactNumber;

  // update the supplier in the database
  const isUpdated = await supplierRepository.dbUpdateSupplier(
    supplierID,
    SupplierName,
    ContactNumber,
  );

  // if no supplier updated, throw error
  if (!isUpdated) {
    throw new Error(`No supplier found with the ID: ${supplierID}`);
  }

  // if the supplier was updated, return the updated supplier details
  const supplier = await supplierRepository.dbGetSupplierByID(supplierID);

  return supplier;
}

// delete a supplier: service
async function deleteSupplier(id) {
  // delete the supplier from the database
  const isDeleted = await supplierRepository.dbDeleteSupplier(id);

  // if no supplier fuond, throw error
  if (!isDeleted) {
    throw new Error(`No supplier found with the ID: ${id}`);
  }

  return true;
}

module.exports = {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
};
