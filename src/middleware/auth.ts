import { RequestHandler } from "express";
import jwt from "jsonwebtoken"
import { User } from "../types/User";

export const auth: RequestHandler = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied. No token provided.")

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_PRIVATE_KEY_NUTRA_CHECK_BACKEND}`);
        req.user = decoded as User;
        next();
    } catch (error) {
        res.status(400).send("Invalid token.")
    }
}