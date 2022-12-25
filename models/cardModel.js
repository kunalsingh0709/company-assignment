const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId

const userModel = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      require: true,
      unique:true
    },
    cardType: {
      type: String,
      require: true,
      enum:["REGULAR","SPECIAL"]
    },
    customerName: {
      type: String,
      require: true,
      trim: true,
      uppercase:true
    },
    status: {
      type: String,
      enum:["ACTIVE","INACTIVE"],
      default:"ACTIVE"
    },
    vision: {
      type: String,
      require: true,
    },
    customerID: {
        type: ObjectId,
        ref: 'customer',
        require: true,
        unique:true
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("card", userModel);
