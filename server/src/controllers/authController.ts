import type { NextFunction, Request, Response } from "express";
import User from "../models/userModel";

// @desc    Login user
// route    GET /auth/sign-in
// @access  public
const authLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            res.status(401);
            throw new Error("Invalid email or password.");
        }

        if (!(await foundUser.matchPassword(password))) {
            console.log("pasok");
            res.status(401);
            throw new Error("Invalid email or password.");
        }

        res.status(200).json({ message: "Login Success" });
    } catch (error) {
        next(error);
    }
};

export { authLogin };
