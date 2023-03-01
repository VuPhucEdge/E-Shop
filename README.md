# Nodejs/Express E-Commerce API

An API for e-commerce works, built using NodeJS & MongoDB

# Deployed Version

Live demo [E-Shop](https://e-shop-api-1ema.onrender.com)

# Getting Start

-  npm install
-  create .env file and create content PORT, NODE_ENV, DB_URL, BASE_URL, JWT_SECRET_KEY, JWT_EXPIRE_TIME, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD

# Run Project

-  npm start with production
-  npm run start:dev with development

# Key Features

## 1. Authentication

-  Signup(Public)

   -  Create user and token using jwt

-  Login(Public)

   -  Login user and create token using jwt

-  Forget Password(Public)

   -  Find by e-mail
   -  Create reset code and hash reset code
   -  Save hash reset code on DB
   -  Send e-mail

-  Verify Reset Code(Public)

   -  Get reset code from user
   -  Hash reset code and compare reset code on DB
   -  Change password reset code on DB and save

-  Reset Password(Public)

   -  Check password reset code
   -  Change new password and save
   -  Create token using jwt

## 2. Authorization

-  Check Login

   -  Check token by req.headers.authorization
   -  Verify token
   -  Check current user
   -  Send current user on req.user

-  Check role

   -  Compare roles and req.user.role

## 3. User

-  Admin

   -  Create user
   -  Get users
   -  Get user
   -  Update user
   -  Delete user
   -  Change user password

-  User

   -  Get logged user

      -  Compate req.params.id and req.user.\_id

   -  Update logged user data by id

      -  Find by id and update

   -  Update logged user password by id

      -  Hash password
      -  Find by id and update

   -  Delete logged user data by id

      -  Find by id and delete

   -  Wishlist

      -  Add product to wishlist
      -  Remove product from wishlist
      -  Get wishlist

   -  Address

      -  Add address
      -  Remove address
      -  Get address

## 4. Category

-  Create category (admin)
-  Get categories (admin)
-  Get category (admin)
-  Update category (admin)
-  Delete category (admin)

## 5. Sub-Category

-  Create sub-category (admin)
-  Get sub-categories (admin)
-  Get sub-category (admin)
-  Update sub-category (admin)
-  Delete sub-category (admin)

## 6. Brand

-  Create Brand (admin)
-  Get Brands (admin)
-  Get Brand (admin)
-  Update Brand (admin)
-  Delete Brand (admin)

## 7. Product

-  Create Product (admin)
-  Get Products (admin)
-  Get Product (admin)
-  Update Product (admin)
-  Delete Product (admin)

## 8. Review

-  Create Review (Public)
-  Get Reviews (Private/Protect/User)
-  Get Review (Public)
-  Update Review (Private/Protect/User)
-  Delete Review (Private/Protect/User-Admin-Manager)

## 9. Coupon

-  Create Coupon (Admin)
-  Get Coupons (Admin)
-  Get Coupon (Admin)
-  Update Coupon (Admin)
-  Delete Coupon (Admin)

## 10. Cart

-  Add product to cart

   -  Get product and color from body
   -  Find product by id
   -  If cart not exist

      -  Create new cart

   -  If cart exist

      -  If product exist in cart

         -  Check product index and update quantity

      -  If product not exist in cart

         -  Push product

   -  Calculate total cart price

-  Get logged user cart
-  Remove item cart

   -  Find one and update

-  Clear cart

   -  Find one and remove

-  Update cart item quantity
-  Apply coupon

   -  Get coupon based on coupon name
   -  Get logged user cart to get total cart price
   -  Calculate price after priceAfterDiscount

## 11. Order

-  Create order

   -  Get cart depend on cartId
   -  Get order price depend on cart price "Check if coupon apply"
   -  Create order with default paymentMethodType cash
   -  After creating order, decrement product quantity, increment product sold
   -  Clear cart depend on cartId

-  Get orders
-  Get order
-  update order to paid
-  update order to delivered
-  Checkout session

   -  Get cart depend on cartId
   -  Get order price depend on cart price "Check if coupon apply"
   -  Create stripe checkout session

-  Create card order

   -  Create order with default paymentMethodType card
   -  After creating order, decrement product quantity, increment product sold
   -  Clear cart depend on cartId

-  webhookCheckout

   -  This webhook will run when stripe payment success paid

# Build With

List of any major frameworks used to build the project.

-  [NodeJS](https://nodejs.org/en/) - JS runtime environment.
-  [ExpressJS](https://expressjs.com/) - The NodeJS framework used.
-  [MongoDB](https://www.mongodb.com/) - NoSQL Database uses JSON-like documents with optional schemas.
-  [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and NodeJS.
-  [Compression](https://www.npmjs.com/package/compression) - NodeJS compression middleware.
-  [Cors](https://www.npmjs.com/package/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
-  [Slugify](https://www.npmjs.com/package/slugify) - Slugifies a string.
-  [Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a . env file into process. env.
-  [Express-Rate-Limiter](https://www.npmjs.com/package/express-rate-limit) - Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset. Plays nice with express-slow-down.
-  [Bcryptjs](https://www.npmjs.com/package/bcryptjs) = On node.js, the inbuilt crypto module's randomBytes interface is used to obtain secure random numbers.
-  [Colors](https://www.npmjs.com/package/colors)
-  [express-async-errors](https://www.npmjs.com/package/express-async-errors) - A dead simple ES6 async/await support hack for ExpressJS.
-  [express-validator](https://www.npmjs.com/package/express-validator) - An express.js middleware for validator.
-  [hpp](https://www.npmjs.com/package/hpp) - Express middleware to protect against HTTP Parameter Pollution attacks
-  [http-status-codes](https://www.npmjs.com/package/http-status-codes) - Constants enumerating the HTTP status codes. Based on the Java Apache HttpStatus API.
-  [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.
-  [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js.
-  [multer](https://www.npmjs.com/package/multer) - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
-  [nodemailer](https://www.npmjs.com/package/nodemailer) - Send emails from Node.js – easy as cake!
-  [sharp](https://www.npmjs.com/package/sharp) - The typical use case for this high speed Node.js module is to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions.
-  [stripe](https://www.npmjs.com/package/stripe) - The Stripe Node library provides convenient access to the Stripe API from applications written in server-side JavaScript.
-  [uuid](https://www.npmjs.com/package/uuid) - For the creation of RFC4122 UUIDs.
-  [cross-env](https://www.npmjs.com/package/cross-env) - Run scripts that set and use environment variables across platforms.
-  [Nodemon](https://www.npmjs.com/package/nodemon) - nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
