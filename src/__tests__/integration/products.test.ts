import request from "supertest"
import mongoose from "mongoose"

import { server } from "../../app"
import { Product } from "../../models/Product"


describe("/api/products", () => {

    beforeEach(() => {
    })

    afterEach(async () => {
        await Product.deleteMany({})
    })

    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    })

    describe("GET /", () => {
        it("should return all products", async () => {
            // Arrange
            await Product.collection.insertMany([
                { name: "productName1" },
                { name: "productName2" }
            ]);

            // Act
            const res = await request(server).get("/api/products");

            // Assert
            expect(res.status).toBe(200);
            expect(res.body.products.some((p: { name: string }) => p.name === "productName1")).toBeTruthy();
            expect(res.body.products.some((p: { name: string }) => p.name === "productName2")).toBeTruthy();

        });

        it("should return a product if valid id is passed", async () => {
            // Arrange
            const mockProduct = {
                "name": "flour",
                "carbohydrate": "100",
                "energyKj": "200",
                "energyKcal": "500",
                "fat": "300",
                "saturatesFat": "200",
                "fiber": "500",
                "protein": "200",
                "salt": "100",
                "suger": "100",
                "barCode": "asdadawasdf"
            }
            const product = new Product(mockProduct);
            await product.save();

            // Act
            const res = await request(server).get(`/api/products/${product.id}`);

            // Arrange
            expect(res.status).toBe(200)
            expect(res.body.product).toHaveProperty("name", product.name)
        })

        it("should return a 404 if invalid id is passed", async () => {
            // Act
            const res = await request(server).get(`/api/products/1`);

            // Arrange
            expect(res.status).toBe(404)
        })
    })
})