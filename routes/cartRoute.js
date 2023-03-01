const express = require("express");

const cartService = require("../services/cartService");
const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));
router
   .route("/")
   .post(cartService.addProductToCart)
   .get(cartService.getLoggedUserCart)
   .delete(cartService.clearCart);

router.put("/applyCoupon", cartService.applyCoupon);

router
   .route("/:itemId")
   .patch(cartService.updateCartItemQuantity)
   .delete(cartService.removeSpecificCartItem);

module.exports = router;
