import User from "../models/user.model.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        message: "Please Provide name,email,or password",
        success: false,
      });
      return;
    }

    const existsUser = await User.findOne({ email });

    if (existsUser) {
      res.status(409).json({
        message: "User allready exists",
        success: false,
      });
      return;
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create user

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User Created SuccessFully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Register user error:", error.message);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      console.error("Unknown error:", error);

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};


export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email) {
      res.status(400).json({
        success: false,
        message: "Please enter email ",
      });
      return;
    }
    if (!password) {
      res.status(400).json({
        success: false,
        message: "Please enter password ",
      });
      return;
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
      return;
    }

    //
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login user error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
 

