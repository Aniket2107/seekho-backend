import mongoose from "mongoose";

mongoose.connect(
  process.env.DB_ATLAS,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("MongoDB connection successful.");
    else
      console.log(
        "Error in DB connection : " + JSON.stringify(err, undefined, 2)
      );
  }
);

module.exports = mongoose;
