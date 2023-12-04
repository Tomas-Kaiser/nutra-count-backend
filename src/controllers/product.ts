import { RequestHandler } from "express";

import { Product } from "../models/Product";
import ProductDTO from "../dtos/Product";


export const getProducts: RequestHandler = async (req, res, next) => {
    const product = await Product.find()

    res.json({ product })
}

export const createProduct: RequestHandler = async (req, res, next) => {
    const product = new Product(req.body as ProductDTO)
    const savedProduct = await product.save()

    res.status(201).json({
        message: "Created a new product",
        savedProduct
    })
}

export const updateProduct: RequestHandler<{ id: string }> = async (req, res, next) => {
    console.log("UPDATE")
    console.log("ID", req.params.id)
    console.log("updatedProduct: ", req.body as ProductDTO)
    const updatedProduct = req.body as ProductDTO
    const product = await Product.findById(req.params.id)

    if (!product) {
        let err = new Error("Cannot find a product...")
        res.status(400)
        next(err)

        return
    }

    product.set(
        {
            name: updatedProduct.name,
            carbohydrate: updatedProduct.carbohydrate,
            energyKj: updatedProduct.energyKj,
            energyKcal: updatedProduct.energyKcal,
            fat: updatedProduct.fat,
            saturatesFat: updatedProduct.saturatesFat,
            fiber: updatedProduct.fiber,
            protein: updatedProduct.protein,
            salt: updatedProduct.salt,
            suger: updatedProduct.suger,
            barCode: updatedProduct.barCode,
            _id: product._id,
            __v: product.__v
        }
    )

    const savedProduct = await product.save()

    res.json({
        message: "Product updated!",
        updatedProduct: savedProduct
    })
}

export const deleteProduct: RequestHandler<{ id: string }> = async (req, res, next) => {
    console.log("Going to delete: ", req.params.id)
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