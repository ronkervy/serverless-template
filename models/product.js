const { Schema } = require("mongoose");

const Product = new Schema({
      name: {
         type: String,
         required: true
      },
      price: {
         type: Integer
      },
      tag: {
         type: String
      }
},{timestamps: true});