import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "./sendMail.js";

const CLIENT_URL = "http://localhost:3000";
const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
const savedDate=date.toString();

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, nic, mobile, password } = req.body;

      if (!name || !email || !nic || !mobile || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 8)
        return res
          .status(400)
          .json({ msg: "Password must be at least 8 characters." });

      const passwordHash = await bcrypt.hash(password, 12);
      //
      const newUser = new Users({
        name,
        email,
        nic,
        mobile,
        password: passwordHash,
        savedDate
      });
      //
      //const activation_token = createActivationToken(newUser);

      // const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      // sendMail(email, url, "Verify your email address");
     //
     await newUser.save();
     //
      res.json({
        msg: "Registration Successfull.Please verify your email to continue!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, nic, mobile, password } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });

      const newUser = new Users({
        name,
        email,
        nic,
        mobile,
        password,
        savedDate
      });

      await newUser.save();

      res.json({ msg: "Account has been activated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
        const {name, avatar,mobile} = req.body
        await Users.findOneAndUpdate({_id: req.user.id}, {
            name, avatar,mobile
        })

        res.json({msg: "Update Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

  resetPassword: async (req, res) => {
    try {
        const {password} = req.body
        
        const passwordHash = await bcrypt.hash(password, 12)

        await Users.findOneAndUpdate({_id: req.user.id}, {
            password: passwordHash
        })

        res.json({msg: "Password successfully changed!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
    deleteUser: async (req, res) => {
      try {
          await Users.findByIdAndDelete(req.params.id)
          res.json({msg: "Profile Deleted!"})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
    },
    allusers:async(req,res)=>{
     Users.find().exec((err,Users)=>{
        if(err){
            return res.status(400).json({
            error:err
           });
       }
          return res.status(200).json({
            success:true,
            existingUser:Users
        });
    });
},
   userRecord:async(req,res)=>{
   var find1=req.params.id;
   find1=find1.toString();
   Users.find({savedDate: { $regex: '.*' + find1 + '.*' } }).exec((err,Users)=>{
     if(err){
         return res.status(400).json({
         error:err
        });
    }
       return res.status(200).json({
         
         success:true,
         userRecord:Users
     });
 });
}

};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export default userCtrl;
