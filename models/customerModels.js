const mongoose = require("mongoose")

const moment = require('moment')

const userModel = new mongoose.Schema(
  {
    firstNmae: {
      type: String,
      require: true,
      trim: true,
      uppercase:true
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      uppercase:true
    },
    mobileNumber: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      minlength:10,
      maxlength:10
    },
    DOB: {
      type: "date",
      format: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.date
    },
    emailID: {
      type: String,
      require: true,
    },
    address: { 
        type: String 
    },
    customerID: { 
        unique:true,
        type: String 
    },
    status: { 
        type: String, 
        enum: ["ACTIVE", "INACTIVE"] 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", userModel);
