import Joi from "joi";
import UserDTO from "../dtos/User";

export const UserValidation = Joi.object<UserDTO>({
    name: Joi.string()
        .min(3)
        .max(255)
        .required(),
    email: Joi.string()
        .min(4)
        .max(255)
        .email()
        .required(),
    password: Joi.string()
        .max(255)
        .required(),
    isAdmin: Joi.boolean().required(),
    weight: Joi.string()
        .min(2)
        .max(3)
        .optional()
})

export const UserUpdateValidation = Joi.object<UserDTO>({
    name: Joi.string()
        .min(3)
        .max(255)
        .required(),
    weight: Joi.string()
        .min(2)
        .max(5)
})

