import Joi from "joi";
import AuthDTO from "../dtos/Auth";

export const AuthValidation = Joi.object<AuthDTO>({
    email: Joi.string()
        .min(4)
        .max(255)
        .email()
        .required(),
    password: Joi.string()
        .max(255)
        .required(),
})

