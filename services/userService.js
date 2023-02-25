const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");

const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const createToken = require("../utils/createToken");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

// Upload single image
exports.uploadUserImage = uploadSingleImage("profileImg");

// Image processing
exports.resizeImage = async (req, res, next) => {
   const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

   if (req.file) {
      await sharp(req.file.buffer)
         .resize(600, 600)
         .toFormat("jpeg")
         .jpeg({ quality: 95 })
         .toFile(`public/uploads/users/${filename}`);

      // Save image into our db
      req.body.profileImg = filename;
   }

   next();
};

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = factory.getAll(User);

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUser = factory.getOne(User);

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private/Admin
exports.createUser = factory.createOne(User);

// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
   const document = await User.findByIdAndUpdate(
      req.params.id,
      {
         name: req.body.name,
         slug: req.body.slug,
         phone: req.body.phone,
         email: req.body.email,
         profileImg: req.body.profileImg,
         role: req.body.role,
      },
      {
         new: true,
      }
   );

   if (!document) {
      throw new ApiError(
         `No document for this id ${req.params.id}`,
         StatusCodes.NOT_FOUND
      );
   }

   res.status(StatusCodes.OK).json({ data: document });
};

exports.changeUserPassword = async (req, res) => {
   const document = await User.findByIdAndUpdate(
      req.params.id,
      {
         password: await bcrypt.hash(req.body.password, 12),
         passwordChangedAt: Date.now(),
      },
      {
         new: true,
      }
   );

   if (!document) {
      throw new ApiError(
         `No document for this id ${req.params.id}`,
         StatusCodes.NOT_FOUND
      );
   }

   res.status(StatusCodes.OK).json({ data: document });
};

// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = factory.deleteOne(User);

// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect
exports.getLoggedUserData = async (req, res, next) => {
   req.params.id = req.user._id;
   next();
};

// @desc    Update logged user password
// @route   PUT /api/v1/users/updateMyPassword
// @access  Private/Protect
exports.updateLoggedUserPassword = async (req, res) => {
   // 1) Update user password based user payload (req.user._id)
   const user = await User.findByIdAndUpdate(
      req.user._id,
      {
         password: await bcrypt.hash(req.body.password, 12),
         passwordChangedAt: Date.now(),
      },
      {
         new: true,
      }
   );

   // 2) Generate token
   const token = createToken(user._id);

   res.status(StatusCodes.OK).json({ data: user, token });
};

// @desc    Update logged user data (without password, role)
// @route   PUT /api/v1/users/updateMe
// @access  Private/Protect
exports.updateLoggedUserData = async (req, res) => {
   const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
         name: req.body.name,
         email: req.body.email,
         phone: req.body.phone,
      },
      { new: true }
   );

   res.status(StatusCodes.OK).json({ data: updatedUser });
};

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect
exports.deleteLoggedUserData = async (req, res) => {
   await User.findByIdAndUpdate(req.user._id, { active: false });

   res.status(StatusCodes.NO_CONTENT).json({ status: "Success" });
};
