const { pool } = require("../../db/connection");
const productRepository = require("../repositories/product.repository");
const saleRepository = require("../repositories/sale.repository");

// ● Record a sale.
async function recordSale(productId, quantity) {
  const conn = await pool.getConnection(); // get one connection from the pool
  // try to:
  try {
    await conn.beginTransaction(); // begin the transaction

    // update the stock first, by decreasing according to the quantity to be sold
    const affectedRows = await productRepository.dbDecreaseStock(
      conn,
      quantity,
      productId,
    );
    // if affectedRows === 0, throw error
    if (affectedRows === 0) {
      throw new Error("Product not found or not enough stock");
    }

    // if the query is successful,
    // record the sale in the
    const saleId = await saleRepository.dbInsertSale(conn, quantity, productId);

    // get the sale details
    const sale = await saleRepository.dbGetSaleById(conn, saleId);

    // commit the transaction, and return the sale details
    await conn.commit(); // commit the transaction
    return sale;
  } catch (err) {
    //  if any error
    await conn.rollback(); // rollback the transaction
    throw err; // throw the error to controller
  } finally {
    /** NOTE for learning: release the connecttion is a must after using it
     * and must be inside the finally block to be called
     * in both success and error cases
     **/
    conn.release(); // release the connection
  }
}

// ● Retrieve all sales.
async function getAllSales() {
  // get all sales from the database
  const sales = await saleRepository.dbGetAllSales();
  return sales;
}

// ● Retrieve sales for a specific product.
async function getSalesByProductId(productId) {
  // check if the product is found
  const product = await productRepository.dbGetProductById(productId);
  if (!product) {
    throw new Error(`Product with ID: ${productId} does not exist`);
  }
  // get all sales for the product from the database
  const sales = await saleRepository.dbGetSalesByProductId(productId);
  if (sales.length === 0) {
    throw new Error("No sales found for this product");
  }
  return sales;
}

module.exports = {
  recordSale,
  getAllSales,
  getSalesByProductId,
};
