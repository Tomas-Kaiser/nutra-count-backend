import _ from "lodash"
import bcrypt from "bcrypt"
import { RequestHandler } from "express"
import { UserValidation } from "../validation/user-validation"
import UserDTO from "../dtos/User"
import { User } from "../models/User";

export const createUser: RequestHandler = async (req, res, next) => {
    const userDTO = req.body as UserDTO;
    const { error } = UserValidation.validate(userDTO);
    if (error) {
        const err = new Error(error.message)
        res.status(400)
        next(err)

        return
    }

    let user = await User.findOne({ email: userDTO.email })
    if (user) {
        const err = new Error("User already registered.")
        res.status(400)
        next(err)

        return
    }

    user = new User(userDTO);

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.status(200).json(_.pick(user, ["_id", "name", "email"]))
}   