const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//==================> Create user <=======================
const register = async (req, res) => {
  try {
    let Body = req.body;
    const { username, email, phone, password } = Body;

    if (!username) {
      return res.status(400).json("Please enter username");
    }

    //==================> Email validation <=======================
    if (!email) {
      return res.status(400).json("Please enter email");
    }
    const Emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let Email = Emailregx.test(Body.email);
    if (!Email) {
      return res.status(400).json("Please enter valid email.");
    }

    //<===================
    const dublicateEmail = await userModel.findOne({ email: email });
    if (dublicateEmail) {
      return res.status(400).json(" Email Already Exists");
    }
    
    //==================> Phone validation <=======================
    if (!phone) {
      return res.status(400).json("Please enter phone number");
    }
    const Phoneregx = /^[0-9]{10}$/;
    let Phone = Phoneregx.test(Body.phone);
    if (!Phone) {
      return res.status(400).json("Please enter valid Phone number.");
    }

    //<===================
    const dublicatePhone = await userModel.findOne({ phone });
    if (dublicatePhone) {
      return res.status(400).json(" Number Already Exists");
    }

    //==================> password validation <=======================
    if (!password) {
      return res.status(400).json("Please enter password");
    }
    const Passregx =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,}$/;
    let Password = Passregx.test(Body.password);
    if (!Password) {
      return res
        .status(400)
        .json(
          "Password must have atleast 1 uppercase\n, 1 lowercase, 1 special charecter\n 1 number and must consist atleast 8 charectors."
        );
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let savedData = await userModel.create(Body);
    res.status(201).send({ data: savedData });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//==================> Login user <=======================

const loginUser = async function (req, res) {
  try {
    let Body = req.body;
    const { email, password } = Body;
    
    if (!email) {
      return res.status(400).json("Please enter email address");
    }
    
    if (!password) {
      return res.status(400).json("Please enter password");
    }
    
    let getUser = await userModel.findOne({  email });
    
    let matchPassword = await bcrypt.compare(password, getUser.password);
    if (!matchPassword) return res.status(401).json("Email or Password is incorrect.");
    
    //token
    
    const token = jwt.sign(
      {
        userId: getUser._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
      );
      const { newPassword, ...other } = getUser
      let User = getUser
      
      res.cookie("access_token", token, 
      {
        httpOnly: true,
      }).status(200).json({User, token});
      
    } catch (error) {
      return res.status(500).json(error.message);
    }
};


//==================> Update user <=======================
const updateUser = async (req,res) => {
    try {
      let data = req.body
      let { username, email, phone} = data

      let id = req.params.id;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json("Please enter valid user id")
        }
        let findUser = await userModel.findById(id);
        if (!findUser) {
            return res.status(300).json("User not found")
        }

        if(email){
            const Emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let Email = Emailregx.test(email);
            if (!Email) {
                return res.status(400).json("Please enter valid email.");
            }
            //<===================
            const dublicateEmail = await userModel.findOne({ email });
            if (dublicateEmail) {
                return res.status(400).json(" Email Already Exists");
            }
        }

        if(phone){
            const Phoneregx = /^[0-9]{10}$/;
            let Phone = Phoneregx.test(phone);
            if (!Phone) {
                return res.status(400).json("Please enter valid Phone number.");
            }

            //<===================
            const dublicatePhone = await userModel.findOne({ phone });
            if (dublicatePhone) {
                return res.status(400).json(" Number Already Exists");
            }
        }

        let user = await userModel.findByIdAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
          );
          return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
//==================> Logout user <=======================
const logout = (req, res) => {
    res.clearCookie("access_token", {sameSite : "none", secure:true }).status(200).json( "User has been logged out. ")
};


//==================> Delete user <=======================
const deleteUser = async (req,res) => {
    try {
        
      const deletedUser = await userModel.deleteOne({_id : req.params.id})
      return res.status(200).json("User deleted successfully")
      
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { register, loginUser, logout, deleteUser, updateUser };