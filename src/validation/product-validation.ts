import Joi from "joi";
import ProductDTO from "../dtos/Product";

export const ProductValidator = Joi.object<ProductDTO>({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    carbohydrate: Joi.string()
        .min(1)
        .max(4)
        .required(),
    energyKj: Joi.string()
        .min(1)
        .max(4)
        .required(),
    energyKcal: Joi.string()
        .min(1)
        .max(4)
        .required(),
    fat: Joi.string()
        .min(1)
        .max(4)
        .required(),
    saturatesFat: Joi.string()
        .min(1)
        .max(4)
        .required(),
    fiber: Joi.string()
        .min(1)
        .max(4)
        .required(),
    protein: Joi.string()
        .min(1)
        .max(4)
        .required(),
    salt: Joi.string()
        .min(1)
        .max(4)
        .required(),
    suger: Joi.string()
        .min(1)
        .max(4)
        .required(),
    barCode: Joi.string()
        .min(10)
        .max(14)
        .required()
})

