const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    full_name : {
        type: String,
        required : [true, "full_name is required"],
    },
    email : {
        type: String,
        required : [true, "email is required"],
    },
    phone_no : {
        type: Number,
        required : [true, "phone number is required"],
    },
    password : {
        type: String,
        required : [true, "password is required"],
        select: false,
    },
}, {
    timestamps: true
})

const UserSch = mongoose.model("User", userSchema);
module.exports = UserSch