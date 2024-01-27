import request from "supertest"

import { server } from "../../../app"
import mongoose from "mongoose";
import ProductDTO from "../../../dtos/Product";
import { User } from "../../../models/User";
import { Product } from "../../../models/Product";

describe("auth middleware", () => {
    let token: string;
    let product: ProductDTO;

    const exec = () => {
        return request(server)
            .post("/api/products")
            .set("x-auth-token", token)
            .send(product)
    }

    beforeEach(() => {
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

    afterEach(async () => {
        await Product.deleteMany({});
    });

    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    })

    it("should return 401 if no token is provided", async () => {
        token = "";

        const res = await exec();

        expect(res.status).toBe(401);

    });

    it("should return 400 if token is invalid", async () => {
        token = "a";

        const res = await exec();

        expect(res.status).toBe(400);

    });

    it("should return 200 if token is valid", async () => {
        const res = await exec();

        expect(res.status).toBe(201);

    });
});