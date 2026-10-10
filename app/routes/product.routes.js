// =============================================
// Task (2) productRouter
// =============================================
const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/product.controller");

// ● Create a product.
productRouter.post("/", productController.createProduct);

// ● Retrieve all products.
productRouter.get("/", productController.getAllProducts);

// ● Retrieve a product by ID.
productRouter.get("/:id", productController.getProductById);

// ● Update a product.
productRouter.patch("/:id", productController.updateProduct);
productRouter.patch("/name/:name", productController.updateProduct);

// ● Delete a product.
productRouter.delete("/:id", productController.deleteProduct);
productRouter.delete("/name/:name", productController.deleteProduct);

module.exports = productRouter;
