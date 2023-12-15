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

        it("should return all products", async () => {
            await Product.collection.insertMany([
                { name: "productName1" },
                { name: "productName2" }
            ]);

            const res = await request(server).get("/api/products");

            expect(res.status).toBe(200);

        })
    })
})