import { RequestHandler } from "express";

import Response from "../dtos/response/Response"
import { Product } from "../models/Product";
import ProductDTO from "../dtos/Product";
import { ProductValidator } from "../validation/product-validation";
import { isValidObjectId } from "mongoose";


export const getProducts: RequestHandler = async (req, res, next) => {
    const products = await Product.find()
    if (!products || products.length === 0) {
        const err = new Error("Cannot find any products...")
        res.status(400)
        next(err)

        return
    }

    res.json(new Response({ products }))
}

export const getProduct: RequestHandler<{ id: string }> = async (req, res, next) => {
    const id = req.params.id
    if (!isValidObjectId(id)) {
        const err = new Error("Id is not valid!")
        res.status(404)
        next(err)

        return
    }

    const product = await Product.findById(id);
    if (!product) {
        const err = new Error("Cannot find a product...")
        res.status(404)
        next(err)

        return
    }

    res.json(new Response({ product }));
}

export const createProduct: RequestHandler = async (req, res, next) => {
    const productDTO = req.body as ProductDTO;
    const { error, value: productValidated } = ProductValidator.validate(productDTO)
    if (error) {
        const err = new Error(error.message)
        res.status(400)
        next(err)

        return
    }

    const product = new Product(productValidated)
    await product.save()

    res.status(201).json(new Response({
        message: "Created a new product",
        product
    }))
}

export const updateProduct: RequestHandler<{ id: string }> = async (req, res, next) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        const err = new Error("Id is not valid!")
        res.status(400)
        next(err)

        return
    }

    const productDTO = req.body as ProductDTO
    const { error, value: productValidated } = ProductValidator.validate(productDTO)
    if (error) {
        const err = new Error(error.message)
        res.status(400)
        next(err)

        return
    }

    const product = await Product.findById(id)
    if (!product) {
        const err = new Error("Cannot find a product...")
        res.status(400)
        next(err)

        return
    }

    product.set({ ...productValidated, ...product });
    await product.save();

    res.json(new Response({
        message: "Product updated!",
        product
    }))
}

export const deleteProduct: RequestHandler<{ id: string }> = async (req, res, next) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        const err = new Error("Id is not valid!")
        res.status(400)
        next(err)

        return
    }

    const product = await Product.findOneAndDelete({ _id: id })
    if (!product) {
        const err = new Error("Cannot find a product... it is probably already deleted!")
        res.status(400)
        next(err)

        return
    }

    res.status(200).json(new Response({
        message: "Product deleted!",
        product
    }))
}