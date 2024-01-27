import request from "supertest"
import mongoose from "mongoose"

import { server } from "../../app"
import { Product } from "../../models/Product"
import { User } from "../../models/User"
import ProductDTO from "../../dtos/Product"


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
                "barCode": "asdadawasdf",
                "name": "flour",
                "nutrition": {
                    "carbohydrate": "100",
                    "energyKj": "200",
                    "energyKcal": "500",
                    "fat": "300",
                    "saturatesFat": "200",
                    "fiber": "500",
                    "protein": "200",
                    "salt": "100",
                    "suger": "100",
                }

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

        it("should return a 404 if no product with given id exists", async () => {
            // Arrange
            const id = new mongoose.Types.ObjectId();
            // Act
            const res = await request(server).get(`/api/products/${id}`);

            // Arrange
            expect(res.status).toBe(404)
        })
    })

    describe("POST /", () => {
        let token: string;
        let product: ProductDTO;

        const exec = async () => {
            return await request(server)
                .post("/api/products")
                .set("x-auth-token", token)
                .send(product)
        }
        beforeEach(async () => {
            token = new User().generateAuthToken();
            product = {
                barCode: "asdadawasdf",
                name: "product1",
                nutrition: {
                    carbohydrate: "100",
                    energyKj: "200",
                    energyKcal: "500",
                    fat: "300",
                    saturatesFat: "200",
                    fiber: "500",
                    protein: "200",
                    salt: "100",
                    suger: "100",
                }
            }
        })

        it("should return 401 if client is not logged in", async () => {
            token = ""

            const res = await exec()

            expect(res.status).toBe(401)

        })

        it("should return 400 if product is less than 3 characters", async () => {
            product.name = "12";

            console.log(product)

            const res = await exec();

            expect(res.status).toBe(400)
        })

        it("should return 400 if product is more than 30 characters", async () => {
            product.name = new Array(32).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        })

        it("should save the product if it is valid", async () => {

            await exec();

            const product = await Product.find({ name: "product1" });

            expect(product).not.toBeNull();
        })

        it("should return the product if it is valid", async () => {
            const res = await request(server)
                .post("/api/products")
                .set("x-auth-token", token)
                .send(product);

            expect(res.body.savedProduct).toHaveProperty("_id")
            expect(res.body.savedProduct).toHaveProperty("name", "product1")
        })
    })
})