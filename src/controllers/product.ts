import { RequestHandler } from "express";
import Joi from "joi";

import { Product } from "../models/Product";
import ProductDTO from "../dtos/Product";


export const getProducts: RequestHandler = async (req, res, next) => {
    const product = await Product.find()
    if (!product || product.length === 0) {
        let err = new Error("Cannot find any products...")
        res.status(400)
        next(err)

        return
    }

    res.json({ product })
}

export const createProduct: RequestHandler = async (req, res, next) => {
    const productDTO = req.body as ProductDTO;
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(20)
            .required(),
    })
    const { error, value: productValidated } = schema.validate(productDTO);
    if (error) {
        let err = new Error(error.message)
        res.status(400)
        next(err)

        return
    }

    const product = new Product(productValidated)
    const savedProduct = await product.save()

    res.status(201).json({
        message: "Created a new product",
        savedProduct
    })
}

export const updateProduct: RequestHandler<{ id: string }> = async (req, res, next) => {
    const updatedProduct = req.body as ProductDTO
    const product = await Product.findById(req.params.id)
    if (!product) {
        let err = new Error("Cannot find a product...")
        res.status(400)
        next(err)

        return
    }

    product.set({ ...updatedProduct, ...product });
    const savedProduct = await product.save();

    res.json({
        message: "Product updated!",
        updatedProduct: savedProduct
    })
}

export const deleteProduct: RequestHandler<{ id: string }> = async (req, res, next) => {
    const product = await Product.findOneAndDelete({ _id: req.params.id })

    if (!product) {
        let err = new Error("Cannot find a product... it is probably already deleted!")
        res.status(400)
        next(err)

        return
    }

    res.status(200).json({
        message: "Product deleted!",
        product
    })
}