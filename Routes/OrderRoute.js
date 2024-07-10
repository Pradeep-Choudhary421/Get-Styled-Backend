const express = require("express")
const { addToCart, getcarItems, deleteCartItem} = require('../Controllers/OrderContorller');
const {isAuthenticated} = require("../MiddleWare/Auth")
const router = express.Router();
router.post("/addToCart",isAuthenticated, addToCart)
router.get("/getcartItems",isAuthenticated, getcarItems)
router.delete("/deletecartItems",isAuthenticated, deleteCartItem)
module.exports = router;