const express = require("express");

const subCategoryService = require("../services/subCategoryService");
const subCategoryValidator = require("../utils/validators/subCategoryValidator");
const authService = require("../services/authService");

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
   .route("/")
   .post(
      authService.protect,
      authService.allowedTo("admin", "manager"),
      subCategoryService.setCategoryIdToBody,
      subCategoryValidator.createSubCategoryValidator,
      subCategoryService.createSubCategory
   )
   .get(
      subCategoryService.createFilterObj,
      subCategoryService.getSubCategories
   );
router
   .route("/:id")
   .get(
      subCategoryValidator.getSubCategoryValidator,
      subCategoryService.getSubCategory
   )
   .put(
      authService.protect,
      authService.allowedTo("admin", "manager"),
      subCategoryValidator.updateSubCategoryValidator,
      subCategoryService.updateSubCategory
   )
   .delete(
      authService.protect,
      authService.allowedTo("admin"),
      subCategoryValidator.deleteSubCategoryValidator,
      subCategoryService.deleteSubCategory
   );

module.exports = router;
