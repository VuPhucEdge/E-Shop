const express = require("express");

const reviewValidator = require("../utils/validators/reviewValidator");
const reviewService = require("../services/reviewService");
const authService = require("../services/authService");

const router = express.Router({ mergeParams: true });

router
   .route("/")
   .get(reviewService.createFilterObj, reviewService.getReviews)
   .post(
      authService.protect,
      authService.allowedTo("user"),
      reviewService.setProductIdAndUserIdToBody,
      reviewValidator.createReviewValidator,
      reviewService.createReview
   );
router
   .route("/:id")
   .get(reviewValidator.getReviewValidator, reviewService.getReview)
   .patch(
      authService.protect,
      authService.allowedTo("user"),
      reviewValidator.updateReviewValidator,
      reviewService.updateReview
   )
   .delete(
      authService.protect,
      authService.allowedTo("user", "manager", "admin"),
      reviewValidator.deleteReviewValidator,
      reviewService.deleteReview
   );

module.exports = router;
