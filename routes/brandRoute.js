const express = require("express");

const brandValidator = require("../utils/validators/brandValidator");
const authService = require("../services/authService");
const brandService = require("../services/brandService");

const router = express.Router();

router
   .route("/")
   .get(brandService.getBrands)
   .post(
      authService.protect,
      authService.allowedTo("admin", "manager"),
      brandService.uploadBrandImage,
      brandService.resizeImage,
      brandValidator.createBrandValidator,
      brandService.createBrand
   );
router
   .route("/:id")
   .get(brandValidator.getBrandValidator, brandService.getBrand)
   .put(
      authService.protect,
      authService.allowedTo("admin", "manager"),
      brandService.uploadBrandImage,
      brandService.resizeImage,
      brandValidator.updateBrandValidator,
      brandService.updateBrand
   )
   .delete(
      authService.protect,
      authService.allowedTo("admin"),
      brandValidator.deleteBrandValidator,
      brandService.deleteBrand
   );

module.exports = router;
