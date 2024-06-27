const express = require("express")
const { addProduct, deleteProduct, updateProduct, getallproducts } = require('../Controllers/ProductController');
const {authenticate} = require("../MiddleWare/Auth")
const router = express.Router();
router.post("/addProduct", addProduct)
router.get("/getAllProduct" , getallproducts)
router.put("/updateProduct/:id" , updateProduct)
router.delete("/deleteProduct/:id",  deleteProduct)
module.exports = router;