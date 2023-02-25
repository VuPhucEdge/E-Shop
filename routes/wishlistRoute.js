const express = require("express");

const authService = require("../services/authService");
const wishlistService = require("../services/wishlistService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));

router
   .route("/")
   .post(wishlistService.addProductToWishlist)
   .get(wishlistService.getLoggedUserWishlist);

router.delete("/:productId", wishlistService.removeProductFromWishlist);

module.exports = router;
