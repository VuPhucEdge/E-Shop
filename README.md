# Nodejs/Express E-Commerce API

An API for e-commerce works, built using NodeJS & MongoDB

# Deployed Version

Live demo [E-Shop](https://e-shop-api-1ema.onrender.com)

# Getting Start

-  npm install
-  create .env file and create content PORT, NODE_ENV, DB_URL, BASE_URL, JWT_SECRET_KEY, JWT_EXPIRE_TIME, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD

# Key Features

1. Authentication

-  Signup(Public)

*  Create user and token using jwt

-  Login(Public)

*  Login user and create token using jwt

-  Forget Password(Public)

*  Find by e-mail
*  Create reset code and hash reset code
*  Save hash reset code on DB
*  Send e-mail

-  Verify Reset Code(Public)

*  Get reset code from user
*  Hash reset code and compare reset code on DB
*  Change password reset code on DB and save

-  Reset Password(Public)

*  Check password reset code
*  Change new password and save
*  Create token using jwt

2. Authorization

-  Check Login

*  Check token by req.headers.authorization
*  Verify token
*  Check current user
*  Send current user on req.user

-  Check role

*  Compare roles and req.user.role

3. User

-
