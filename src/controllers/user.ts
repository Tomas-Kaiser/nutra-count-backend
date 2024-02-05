import _ from "lodash"
import bcrypt from "bcrypt"
import Response from "../dtos/response/Response"
import { RequestHandler } from "express"
import { UserUpdateValidation, UserValidation } from "../validation/user-validation"
import UserDTO from "../dtos/User"
import { User } from "../models/User";
import { isValidObjectId } from "mongoose"

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

    res.status(201).json(new Response({ user: _.pick(user, ["_id", "name", "email", "isAdmin"]) }))
}

export const updateUser: RequestHandler<{ id: string }> = async (req, res, next) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        const err = new Error("Id is not valid!")
        res.status(400)
        next(err)

        return
    }

    const userDTO = req.body as UserDTO;
    const { error } = UserUpdateValidation.validate(userDTO);
    if (error) {
        const err = new Error(error.message)
        res.status(400)
        next(err)

        return
    }

    const user = await User.findById(id);
    console.log("user ??", user)
    if (!user) {
        const err = new Error("Cannot find a user...")
        res.status(400)
        next(err)

        return
    }

    await user.set(
        {
            name: userDTO.name,
            weight: userDTO.weight
        }
    ).save();

    res.json(new Response({
        message: "Product updated!",
        user
    }))
}