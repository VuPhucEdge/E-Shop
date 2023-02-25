const express = require("express");

const categoryValidator = require("../utils/validators/categoryValidator");
const categoryService = require("../services/categoryService");
const authService = require("../services/authService");

const subcategoriesRoute = require("./subCategoryRoute");

const router = express.Router();

// Nested route
router.use("/:categoryId/subcategories", subcategoriesRoute);

router
   .route("/")
   .get(categoryService.getCategories)
   .post(
      authService.protect,
      authService.allowedTo("admin", "manager"),
      categoryService.uploadCategoryImage,
      categoryService.resizeImage,
      categoryValidator.createCategoryValidator,
      categoryService.createCategory
   );
router
   .route("/:id")
   .get(categoryValidator.getCategoryValidator, categoryService.getCategory)
   .put(
      authService.protect,
      authService.allowedTo("admin", "manager"),
      categoryService.uploadCategoryImage,
      categoryService.resizeImage,
      categoryValidator.updateCategoryValidator,
      categoryService.updateCategory
   )
   .delete(
      authService.protect,
      authService.allowedTo("admin"),
      categoryValidator.deleteCategoryValidator,
      categoryService.deleteCategory
   );

module.exports = router;
