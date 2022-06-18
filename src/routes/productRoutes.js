import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import loginRequired from "../middlewars/loginRequired.js";
const productRoutes = Router();
const productsController = new ProductController();
import { validateRequest } from "../validators/RequestValidator.js";
import { postProductValidator } from "../validators/products/postProductValidator.js";
import { putProductValidator } from "../validators/products/putProductValidator.js";

//POST
productRoutes.post(
  "/",
  validateRequest(postProductValidator),
  productsController.save
);

//GET
productRoutes.get("/", loginRequired, productsController.findAll);
productRoutes.get("/:id", loginRequired, productsController.findById);

//UPDATE
productRoutes.put(
  "/:id",
  loginRequired,
  validateRequest(putProductValidator),
  productsController.update
);

//DELETE
productRoutes.delete("/:id", loginRequired, productsController.delete);

export { productRoutes };
