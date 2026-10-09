// ● Record a sale.
async function recordSale(productId, quantitySold, saleDate) {
  // === controller ===
  // first: validate the data
  // check if quantity ordered is greater than 0
  // check if sale date is valid date
  // if not valid, throw error (400 bad request)
  // === controller ===
  // ============== service/repository ===============
  // second: open transaction in db
  // try to:
  // update the stock first,
  // to act as a lock, check if the product exists,
  // and if the stock quantity is greater than or equal to the quantity sold
  // in one single step/query
  // - using the Where condition in db query to check
  // - if the product exists = (id),
  // - and the stock quantity is greater than or equal to the quantity sold
  //then, evaluate the result of the query,
  // if affectedRows === 0, throw error,
  // Procudt not exist or not enough stock
  //   ========
  // 3rd: if the query is successful,
  // record the sale in the sales table (saleId (auto), productId, quantitySold, saleDate)
  // commit the transaction, and return the sale details
  // or, if any error, rollback the transaction, and throw error to controller
  //============== service/repository ===============
  // === controller ===
  // 4th:
  // try record the sale service
  // if good, return 201 created response with sale details
  // if not, catch the error and return 404 not found response with error message
}
