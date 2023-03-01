const express = require("express");

const productValidator = require("../utils/validators/productValidator");
const productService = require("../services/productService");
const authService = require("../services/authService");
const reviewsRoute = require("./reviewRoute");

const router = express.Router();

// POST   /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews/87487sfww3
router.use("/:productId/reviews", reviewsRoute);

router
   .route("/")
   .get(productService.getProducts)
   .post(
      authService.protect,
      authService.allowedTo("admin", "manager"),
      productService.uploadProductImages,
      productService.resizeProductImages,
      productValidator.createProductValidator,
      productService.createProduct
   );
router
   .route("/:id")
   .get(productValidator.getProductValidator, productService.getProduct)
   .patch(
      authService.protect,
      authService.allowedTo("admin", "manager"),
      productService.uploadProductImages,
      productService.resizeProductImages,
      productValidator.updateProductValidator,
      productService.updateProduct
   )
   .delete(
      authService.protect,
      authService.allowedTo("admin"),
      productValidator.deleteProductValidator,
      productService.deleteProduct
   );

module.exports = router;
