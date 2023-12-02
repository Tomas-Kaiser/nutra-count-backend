import { RequestHandler } from "express";

import { Product } from "../models/Product";
import ProductDto from "../dtos/Product";


export const getProducts: RequestHandler = async (req, res, next) => {
    const product = await Product.find()

    res.json({ product })
}

export const createProduct: RequestHandler = async (req, res, next) => {
    const { name } = req.body as ProductDto
    // const newProduct = new Product(Math.random().toString(), name)
    const newProduct = new Product({ name: "Test product" })
    await newProduct.save()
    // products.push(newProduct)

    res.status(201).json({
        message: "Created a new product",
        newProduct
    })
}

// export const updateProduct: RequestHandler<{ id: string }> = (req, res, next) => {
//     const productId = req.params.id
//     const productIndex = products.findIndex(p => p.id === productId)

//     if (productIndex < 0) {
//         let err = new Error("Cannot find a product...")
//         res.status(400)
//         next(err)

//         return
//     }

//     const { name: productName } = req.body as ProductDTO
//     products[productIndex] = new Product(products[productIndex].id, productName)

//     res.json({
//         message: "Product updated!",
//         updatedProduct: products[productIndex]
//     })
// }

// export const deleteProduct: RequestHandler<{ id: string }> = (req, res, next) => {
//     const productId = req.params.id
//     const productIndex = products.findIndex(p => p.id === productId)

//     if (productIndex < 0) {
//         let err = new Error("Cannot find a product... it is probably already deleted!")
//         res.status(400)
//         next(err)

//         return
//     }

//     products.splice(productIndex, 1)
//     res.status(200).json({
//         message: "Product deleted!",
//         products
//     })
// }