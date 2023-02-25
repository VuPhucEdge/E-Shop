const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res
         .status(StatusCodes.BAD_REQUEST)
         .json({ errors: errors.array() });
   }
   next();
};

module.exports = validatorMiddleware;
