const mongoose = require("mongoose");

const connectDb = (url) => {
   return mongoose
      .connect(url)
      .then((conn) =>
         console.log(`Database connected on ${conn.connection.host}`)
      );
};

module.exports = connectDb;
