const express = require("express");

const orderService = require("../services/orderService");
const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect);

router.get(
   "/checkout-session/:cartId",
   authService.allowedTo("user"),
   orderService.checkoutSession
);

router
   .route("/:cartId")
   .post(authService.allowedTo("user"), orderService.createCashOrder);
router.get(
   "/",
   authService.allowedTo("user", "admin", "manager"),
   orderService.filterOrderForLoggedUser,
   orderService.findAllOrders
);
router.get("/:id", orderService.findSpecificOrder);

router.put(
   "/:id/pay",
   authService.allowedTo("admin", "manager"),
   orderService.updateOrderToPaid
);
router.put(
   "/:id/deliver",
   authService.allowedTo("admin", "manager"),
   orderService.updateOrderToDelivered
);

module.exports = router;
