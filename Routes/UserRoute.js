const express = require("express")
const { createUser, deleteUser, updateUser, getallusers, login } = require('../Controllers/UserController');
const {isAuthenticated} = require("../MiddleWare/Auth")
const router = express.Router();
router.post("/createUser", createUser)
router.post("/login", login);   
router.get("/getAllUser", isAuthenticated , getallusers)
router.put("/updateUser/:id", updateUser)
router.delete("/deleteUser/:id", deleteUser)
module.exports = router;