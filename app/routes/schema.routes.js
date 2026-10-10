const { Router } = require("express");
const schemaRouter = Router();
const schemaController = require("../controllers/schema.controller");

schemaRouter.post("/products/category", schemaController.addCategoryColumn);
schemaRouter.delete(
  "/products/category",
  schemaController.removeCategoryColumn,
);
schemaRouter.patch(
  "/suppliers/contact-number",
  schemaController.changeContactNumberType,
);
schemaRouter.patch(
  "/products/product-name",
  schemaController.makeProductNameNotNull,
);

module.exports = schemaRouter;
