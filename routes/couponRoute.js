const express = require("express");

const couponService = require("../services/couponService");
const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("admin", "manager"));

router
   .route("/")
   .get(couponService.getCoupons)
   .post(couponService.createCoupon);
router
   .route("/:id")
   .get(couponService.getCoupon)
   .put(couponService.updateCoupon)
   .delete(couponService.deleteCoupon);

module.exports = router;
