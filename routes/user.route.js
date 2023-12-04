const {Router}=require("express");
const userRoute=Router()
const { auth } = require("../middlewares/auth.middleware");
const {userSignup,userLogin}=require("../controllers/user.controller");




userRoute.post("/register",userSignup)
userRoute.post("/login",userLogin)

module.exports={userRoute}