const ProductSch = require("../Models/ProductSchema")
require('dotenv').config();

const addProduct = async (req, res) => {
    const data = req.body;
    const product = new ProductSch(data);
    try {
        await product.save();
        return res.status(201).json({ message: "Product added successfully",
            result:product
         });
        } catch (error) {
            return res.status(400).json({ message: "Error while adding product" });
            }
};

const getallproducts = async (req, res) => {
    try {
      const users = await ProductSch.find({});
      return res.status(200).json({
        message: "Data Fetched Successfully",
        count: users.length,
        result: users,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };
  const updateProduct = async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
  
    try {
      const product = await ProductSch.findOne({
        _id: id,
      });
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      } 
      await ProductSch.findByIdAndUpdate(id, updatedProduct);
      return res.status(200).json({
        message: "Product Updated Successfully",
        result: updatedProduct,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await ProductSch.findOne({
        _id: id,
      });
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      await ProductSch.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Product Deleted Successfully",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  
module.exports = { addProduct, getallproducts, updateProduct, deleteProduct };
