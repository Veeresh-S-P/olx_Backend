const {UserModel}=require("../models/user.model")

require("dotenv").config();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSignup=async (req,res)=>{

    let {email,password}=req.body

    try {
        let user=await UserModel.findOne({email});
        if(user){
            return res.status(409).send({ "success":false,"error": "already exist please login" })
        }
        
        const hash = bcrypt.hashSync(password, 6);
        let newUser=new UserModel({email,password:hash,role,username,avatar})
        console.log(newUser)
        await newUser.save()
        res.status(200).send({ "success": true, "message": "User registered successfully"})

    } catch (error) {
        res.status(400).send({"error":error.message})
    }
}


const userLogin = async (req, res) => {
    let { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).send({ success: false, error: 'Invalid Email' });
      }
  
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.status(500).send({ success: false, error: 'An error occurred during password comparison.' });
        }
  
        if (result) {
          const token = jwt.sign({ userID: user._id, role: user.role }, process.env.accesstoken, { expiresIn: '7d' });
          return res.status(200).send({ success: true, message: 'Login Successful', token: token });
        } else {
          return res.status(401).send({ success: false, error: 'Invalid Password' });
        }
      });
    } catch (error) {
      return res.status(500).send({ success: false, error: 'An error occurred while processing the request.' });
    }
  };




module.exports={userSignup,userLogin}