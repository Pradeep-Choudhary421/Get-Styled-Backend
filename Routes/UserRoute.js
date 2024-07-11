const express = require("express")
const { createUser, deleteUser, updateUser, getallusers, login , sendOtp} = require('../Controllers/UserController');
const {isAuthenticated} = require("../MiddleWare/Auth")
const router = express.Router();
router.post("/createUser", createUser)
router.post("/login", login);   
router.post("/sendOtp", sendOtp );   
router.get("/getAllUser" , getallusers)
router.post("/updateUser", updateUser)
router.delete("/deleteUser/:id", deleteUser)
module.exports = router;