import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    console.log("COOKIE:", req.cookies);


    const token =
      req.cookies?.smartcart_token ||
      req.cookies?.token;


    console.log("TOKEN:", token);


    if (!token) {

      return res.status(401).json({
        success:false,
        message:"Unauthorized. Please login first",
      });

    }


    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as any;


    console.log(
      "DECODED USER:",
      decoded
    );


    (req as any).user = decoded;


    next();


  } catch(error){


    console.error(
      "AUTH ERROR:",
      // error
    );


    return res.status(401).json({
      success:false,
      message:"Invalid or expired token",
    });

  }

};