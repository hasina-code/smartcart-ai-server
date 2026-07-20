import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { generateToken } from "../utils/generateToken";


// ==========================
// Google Login
// ==========================
export const googleLogin = async (
  req: Request,
  // res: Response
) => {
  try {

    const { name, email, photo } = req.body;

    let user = await User.findOne({ email });


    if (!user) {
      user = await User.create({
        name,
        email,
        photo,
        role: "user",
      });
    }


    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });


    res.clearCookie("token");
    res.clearCookie("smartcart_token");


    res.cookie(
      "smartcart_token",
      token,
      {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }
    );


    const { password, ...safeUser } =
      user.toObject() as any;


    return res.status(200).json({

      success:true,
      message:"Login Successful",
      user:safeUser,

    });


  } catch(error){

    console.error(error);

    return res.status(500).json({

      success:false,
      message:"Authentication Failed",

    });

  }
};





// ==========================
// Register User
// ==========================
export const registerUser = async (
  req: Request,
  res: Response
) => {

try {


const {
name,
email,
password,
photo
}=req.body;



if(!name || !email || !password){

return res.status(400).json({

success:false,
message:"All fields are required",

});

}



const exists =
await User.findOne({email});


if(exists){

return res.status(400).json({

success:false,
message:"User already exists",

});

}



const hashedPassword =
await bcrypt.hash(password,10);



const user =
await User.create({

name,
email,
password:hashedPassword,
photo:photo || "",
role:"user",

});



const token =
generateToken({

id:user._id.toString(),
email:user.email,
role:user.role,

});



res.clearCookie("token");
res.clearCookie("smartcart_token");



res.cookie(
"smartcart_token",
token,
{

httpOnly:true,
secure:false,
sameSite:"lax",
path:"/",
maxAge:7 * 24 * 60 * 60 * 1000,

}

);



const {
password:_,
...safeUser
}=user.toObject() as any;



return res.status(201).json({

success:true,
message:"Registration Successful",
user:safeUser,

});


}catch(error){

console.error(error);


return res.status(500).json({

success:false,
message:"Registration Failed",

});


}

};






// ==========================
// Login User
// ==========================
export const loginUser = async (
req: Request,
res: Response
) => {


try {


const {
email,
password
}=req.body;



if(!email || !password){

return res.status(400).json({

success:false,
message:"Email and Password are required",

});

}



const user =
await User.findOne({email});



if(!user){

return res.status(400).json({

success:false,
message:"User not found",

});

}



console.log(
"LOGIN USER ID:",
user._id.toString()
);


console.log(
"LOGIN USER EMAIL:",
user.email
);



const isMatch =
await bcrypt.compare(
password,
user.password
);



if(!isMatch){

return res.status(400).json({

success:false,
message:"Invalid credentials",

});

}




const token =
generateToken({

id:user._id.toString(),
email:user.email,
role:user.role,

});



console.log(
"GENERATED TOKEN USER ID:",
user._id.toString()
);



res.clearCookie("token",{

httpOnly:true,
secure:false,
sameSite:"lax",
path:"/",

});


res.clearCookie("smartcart_token",{

httpOnly:true,
secure:false,
sameSite:"lax",
path:"/",

});






res.cookie(
"smartcart_token",
token,
{

httpOnly:true,
secure:false,
sameSite:"lax",
path:"/",
maxAge:7 * 24 * 60 * 60 * 1000,

}

);



const {
password:_,
...safeUser
}=user.toObject() as any;



return res.status(200).json({

success:true,
message:"Login Successful",
user:safeUser,

});



}catch(error){

console.error(error);


return res.status(500).json({

success:false,
message:"Login Failed",

});


}


};






// ==========================
// Logout User
// ==========================
export const logoutUser = async (
req:Request,
res:Response
)=>{


res.clearCookie(
"smartcart_token",
{

httpOnly:true,
secure:false,
sameSite:"lax",
path:"/",

}
);



res.clearCookie(
"token",
{

httpOnly:true,
secure:false,
sameSite:"lax",
path:"/",

}
);



return res.status(200).json({

success:true,
message:"Logout Successful",

});


};







// ==========================
// Get Me
// ==========================
export const getMe = async (
req:Request,
res:Response
)=>{


try{


const token =
req.cookies?.smartcart_token;



if(!token){

return res.status(401).json({

user:null

});

}



const decoded =
jwt.verify(
token,
process.env.JWT_SECRET!
) as any;



const user =
await User.findById(
decoded.id
)
.select("-password");



return res.status(200).json({

user

});



}catch(error){


return res.status(401).json({

user:null

});


}


};







// ==========================
// Update Profile
// ==========================
export const updateProfile = async (
req:Request,
res:Response
)=>{


try{


const token =
req.cookies?.smartcart_token;



if(!token){

return res.status(401).json({

success:false,
message:"Unauthorized",

});

}



const decoded =
jwt.verify(
token,
process.env.JWT_SECRET!
) as any;



const {
name,
photo
}=req.body;



const user =
await User.findByIdAndUpdate(

decoded.id,

{
name,
photo
},

{
new:true
}

)
.select("-password");



return res.status(200).json({

success:true,
message:"Profile Updated Successfully",
user,

});


}catch(error){


console.error(error);


return res.status(500).json({

success:false,
message:"Profile Update Failed",

});


}


};