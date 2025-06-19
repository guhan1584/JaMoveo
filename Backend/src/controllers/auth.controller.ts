import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { loginSchema, signupSchema } from "../validations/auth.schema";
import jwt from "jsonwebtoken";

// Helper function to generate JWT token
const generateToken = (user: any) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    {
      userId: user._id,
      username: user.username,
      admin: user.admin,
      instrument: user.instrument,
    },
    secret,
    { expiresIn: "24h" }
  );
};

// Helper function to format user response
const formatUserResponse = (user: any) => ({
  userId: user._id,
  username: user.username,
  admin: user.admin,
  instrument: user.instrument,
});

export const signupHandler =
  (isAdmin: boolean) => async (req: Request, res: Response) => {
    try {
      const parsed = signupSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ message: parsed.error.flatten().fieldErrors });
        return;
      }

      const { username, password, instrument } = parsed.data;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        instrument,
        admin: isAdmin,
      });
      await newUser.save();

      // Generate token and format response
      const token = generateToken(newUser);
      const userResponse = formatUserResponse(newUser);

      res.status(201).json({
        message: isAdmin ? "Admin user created" : "User created",
        token,
        user: userResponse,
      });
      return;
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof Error && error.message.includes("JWT_SECRET")) {
        res.status(500).json({ message: "Server misconfiguration" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
      return;
    }
  };

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.flatten().fieldErrors });
      return;
    }

    const { username, password } = parsed.data;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate token and format response using helper functions
    const token = generateToken(user);
    const userResponse = formatUserResponse(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof Error && error.message.includes("JWT_SECRET")) {
      res.status(500).json({ message: "Server misconfiguration" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
    return;
  }
};
