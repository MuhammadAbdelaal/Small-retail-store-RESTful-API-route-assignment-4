const schemaRepository = require("../repositories/schema.repository");

async function addCategoryColumn() {
  await schemaRepository.dbAddCategoryColumn();
}

async function removeCategoryColumn() {
  await schemaRepository.dbRemoveCategoryColumn();
}

async function changeContactNumberType() {
  await schemaRepository.dbChangeContactNumberType();
}

async function makeProductNameNotNull() {
  await schemaRepository.dbMakeProductNameNotNull();
}

module.exports = {
  addCategoryColumn,
  removeCategoryColumn,
  changeContactNumberType,
  makeProductNameNotNull,
};
