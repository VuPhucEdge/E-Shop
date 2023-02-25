const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist
// @access  Protected/User
exports.addProductToWishlist = async (req, res) => {
   // $addToSet => add productId to wishlist array if productId not exist
   const user = await User.findByIdAndUpdate(
      req.user._id,
      {
         $addToSet: { wishlist: req.body.productId },
      },
      { new: true }
   );

   res.status(StatusCodes.OK).json({
      status: "success",
      message: "Product added successfully to your wishlist.",
      data: user.wishlist,
   });
};

// @desc    Remove product from wishlist
// @route   DELETE /api/v1/wishlist/:productId
// @access  Protected/User
exports.removeProductFromWishlist = async (req, res) => {
   // $pull => remove productId from wishlist array if productId exist
   const user = await User.findByIdAndUpdate(
      req.user._id,
      {
         $pull: { wishlist: req.params.productId },
      },
      { new: true }
   );

   res.status(StatusCodes.OK).json({
      status: "success",
      message: "Product removed successfully from your wishlist.",
      data: user.wishlist,
   });
};

// @desc    Get logged user wishlist
// @route   GET /api/v1/wishlist
// @access  Protected/User
exports.getLoggedUserWishlist = async (req, res) => {
   const user = await User.findById(req.user._id).populate("wishlist");

   res.status(StatusCodes.OK).json({
      status: "success",
      results: user.wishlist.length,
      data: user.wishlist,
   });
};
