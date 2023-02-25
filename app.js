require("dotenv").config();
require("express-async-errors");
const path = require("path");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

// rest of the packages
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

// routes
const mountRoutes = require("./routes");
const { webhookCheckout } = require("./services/orderService");

// database
const connectDb = require("./db/database");

// express app
const app = express();

// Enable other domains to access your application
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

// Checkout webhook
app.post(
   "/webhook-checkout",
   express.raw({ type: "application/json" }),
   webhookCheckout
);

// Middlewares
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
   console.log(`mode: ${process.env.NODE_ENV}`);
}

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 100,
   message:
      "Too many accounts created from this IP, please try again after an hour",
});

// Apply the rate limiting middleware to all requests
app.use("/api", limiter);

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(
   hpp({
      whitelist: [
         "price",
         "sold",
         "quantity",
         "ratingsAverage",
         "ratingsQuantity",
      ],
   })
);

// Mount Routes
mountRoutes(app);

app.all("*", (req, res, next) => {
   next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const start = async () => {
   try {
      await connectDb(process.env.DB_URL);
      app.listen(PORT, () => console.log(`App running on port ${PORT}`));
   } catch (error) {
      console.log(error);
   }
};
start();

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
   console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
   server.close(() => {
      console.error(`Shutting down....`);
      process.exit(1);
   });
});