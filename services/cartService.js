const ApiError = require("../utils/apiError");
const { StatusCodes } = require("http-status-codes");

const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Cart = require("../models/cartModel");

const calcTotalCartPrice = (cart) => {
   let totalPrice = 0;
   cart.cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
   });
   cart.totalCartPrice = totalPrice;
   cart.totalPriceAfterDiscount = undefined;
   return totalPrice;
};

// @desc    Add product to  cart
// @route   POST /api/v1/cart
// @access  Private/User
exports.addProductToCart = async (req, res) => {
   const { productId, color } = req.body;
   const product = await Product.findById(productId);

   // 1) Get Cart for logged user
   let cart = await Cart.findOne({ user: req.user._id });

   if (!cart) {
      // create cart fot logged user with product
      cart = await Cart.create({
         user: req.user._id,
         cartItems: [{ product: productId, color, price: product.price }],
      });
   } else {
      // product exist in cart, update product quantity
      const productIndex = cart.cartItems.findIndex(
         (item) => item.product.toString() === productId && item.color === color
      );

      if (productIndex > -1) {
         const cartItem = cart.cartItems[productIndex];
         cartItem.quantity += 1;

         cart.cartItems[productIndex] = cartItem;
      } else {
         // product not exist in cart,  push product to cartItems array
         cart.cartItems.push({
            product: productId,
            color,
            price: product.price,
         });
      }
   }

   // Calculate total cart price
   calcTotalCartPrice(cart);
   await cart.save();

   res.status(StatusCodes.OK).json({
      status: "success",
      message: "Product added to cart successfully",
      numOfCartItems: cart.cartItems.length,
      data: cart,
   });
};

// @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Private/User
exports.getLoggedUserCart = async (req, res) => {
   const cart = await Cart.findOne({ user: req.user._id });

   if (!cart) {
      throw new ApiError(
         `There is no cart for this user id : ${req.user._id}`,
         StatusCodes.NOT_FOUND
      );
   }

   res.status(StatusCodes.OK).json({
      status: "success",
      numOfCartItems: cart.cartItems.length,
      data: cart,
   });
};

// @desc    Remove specific cart item
// @route   DELETE /api/v1/cart/:itemId
// @access  Private/User
exports.removeSpecificCartItem = async (req, res) => {
   const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      {
         $pull: { cartItems: { _id: req.params.itemId } },
      },
      { new: true }
   );

   calcTotalCartPrice(cart);
   cart.save();

   res.status(StatusCodes.OK).json({
      status: "success",
      numOfCartItems: cart.cartItems.length,
      data: cart,
   });
};

// @desc    clear logged user cart
// @route   DELETE /api/v1/cart
// @access  Private/User
exports.clearCart = async (req, res) => {
   await Cart.findOneAndDelete({ user: req.user._id });
   res.status(StatusCodes.NO_CONTENT).send();
};

// @desc    Update specific cart item quantity
// @route   PUT /api/v1/cart/:itemId
// @access  Private/User
exports.updateCartItemQuantity = async (req, res, next) => {
   const { quantity } = req.body;

   const cart = await Cart.findOne({ user: req.user._id });

   if (!cart) {
      throw new ApiError(
         `there is no cart for user ${req.user._id}`,
         StatusCodes.NOT_FOUND
      );
   }

   const itemIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() === req.params.itemId
   );

   if (itemIndex > -1) {
      const cartItem = cart.cartItems[itemIndex];
      cartItem.quantity = quantity;
      cart.cartItems[itemIndex] = cartItem;
   } else {
      throw new ApiError(
         `there is no item for this id :${req.params.itemId}`,
         StatusCodes.NOT_FOUND
      );
   }

   calcTotalCartPrice(cart);

   await cart.save();

   res.status(StatusCodes.OK).json({
      status: "success",
      numOfCartItems: cart.cartItems.length,
      data: cart,
   });
};

// @desc    Apply coupon on logged user cart
// @route   PUT /api/v1/cart/applyCoupon
// @access  Private/User
exports.applyCoupon = async (req, res, next) => {
   // 1) Get coupon based on coupon name
   const coupon = await Coupon.findOne({
      name: req.body.coupon,
      expire: { $gt: Date.now() },
   });

   if (!coupon) {
      throw new ApiError(
         "Coupon is invalid or expired",
         StatusCodes.BAD_REQUEST
      );
   }

   // 2) Get logged user cart to get total cart price
   const cart = await Cart.findOne({ user: req.user._id });

   const totalPrice = cart.totalCartPrice;

   // 3) Calculate price after priceAfterDiscount
   const totalPriceAfterDiscount = (
      totalPrice -
      (totalPrice * coupon.discount) / 100
   ).toFixed(2); // 99.23

   cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
   await cart.save();

   res.status(StatusCodes.OK).json({
      status: "success",
      numOfCartItems: cart.cartItems.length,
      data: cart,
   });
};
