import { RequestHandler } from "express";
import { Product } from "../models/Product";
import ProductDto from "../dtos/Product";
import ProductDTO from "../dtos/Product";

const products: Product[] = []

export const getProduct: RequestHandler = (req, res, next) => {
    res.json({ products })
}

export const createProduct: RequestHandler = (req, res, next) => {
    const { name } = req.body as ProductDto
    const newProduct = new Product(Math.random().toString(), name)
    products.push(newProduct)

    res.status(201).json({
        message: "Created new product",
        newProduct
    })
}

export const updateProduct: RequestHandler<{ id: string }> = (req, res, next) => {
    const productId = req.params.id
    const productIndex = products.findIndex(p => p.id === productId)

    if (productIndex < 0) throw new Error("Cannot find a product...")
    const { name: productName } = req.body as ProductDTO
    products[productIndex] = new Product(products[productIndex].id, productName)

    res.json({
        message: "Product updated!",
        updatedProduct: products[productIndex]
    })
}