const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  BrandName: {
    type: String,
    required: true,
  },
  ProductDescription: {
    type: String,
    required: true,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
  ProductImage: {
    type: String,
    required: true,
  },
  ProductCategory: {
    type: String,
    required: true,
  },
  ProductRelatedImg: {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uri"
      }
    },
  ProductSizes: [
    {
      size: "string",
    },
    {
      size: "string",
    },
    {
      size: "string",
    },
  ],
  ProductColor: [
    {
      color_name: "string",
    },
    {
      color_name: "string",
    },
    {
      color_name: "string",
    },
  ],
  ProductRating: {
    type: Number,
    required: true,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ProductType: {
    type: String,
    required: true,
  },
});

const ProductSch = mongoose.model("Product", ProductSchema);
module.exports = ProductSch;
