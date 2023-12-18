import { RequestHandler } from "express";
import bcrypt from "bcrypt"

import { AuthValidation } from "../validation/auth-validation";
import { User } from "../models/User";
import AuthDTO from "../dtos/Auth";

export const authUser: RequestHandler = async (req, res, next) => {
    const authDTO = req.body as AuthDTO;
    const { error } = AuthValidation.validate(authDTO);
    if (error) {
        const err = new Error("Invalid username or password!")
        res.status(400)
        next(err)

        return
    }

    let user = await User.findOne({ email: authDTO.email })
    if (!user) {
        const err = new Error("Invalid username or password!")
        res.status(400)
        next(err)

        return
    }

    const validPassword = await bcrypt.compare(authDTO.password, user.password);
    if (!validPassword) {
        const err = new Error("Invalid username or password!")
        res.status(400)
        next(err)

        return
    }

    const token = user.generateAuthToken();
    res.status(200).send(token)
}  