const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

// @desc    Add address to user addresses list
// @route   POST /api/v1/addresses
// @access  Protected/User
exports.addAddress = async (req, res) => {
   // $addToSet => add address object to user addresses  array if address not exist
   const user = await User.findByIdAndUpdate(
      req.user._id,
      {
         $addToSet: { addresses: req.body },
      },
      { new: true }
   );

   res.status(StatusCodes.OK).json({
      status: "success",
      message: "Address added successfully.",
      data: user.addresses,
   });
};

// @desc    Remove address from user addresses list
// @route   DELETE /api/v1/addresses/:addressId
// @access  Protected/User
exports.removeAddress = async (req, res) => {
   // $pull => remove address object from user addresses array if addressId exist
   const user = await User.findByIdAndUpdate(
      req.user._id,
      {
         $pull: { addresses: { _id: req.params.addressId } },
      },
      { new: true }
   );

   res.status(StatusCodes.OK).json({
      status: "success",
      message: "Address removed successfully.",
      data: user.addresses,
   });
};

// @desc    Get logged user addresses list
// @route   GET /api/v1/addresses
// @access  Protected/User
exports.getLoggedUserAddresses = async (req, res) => {
   const user = await User.findById(req.user._id).populate("addresses");

   res.status(StatusCodes.OK).json({
      status: "success",
      results: user.addresses.length,
      data: user.addresses,
   });
};
