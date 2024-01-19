import request from "supertest"

import { server } from "../../../app"
import mongoose from "mongoose";
import ProductDTO from "../../../dtos/Product";
import { User } from "../../../models/User";

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
            name: "product1",
            carbohydrate: "100",
            energyKj: "200",
            energyKcal: "500",
            fat: "300",
            saturatesFat: "200",
            fiber: "500",
            protein: "200",
            salt: "100",
            suger: "100",
            barCode: "asdadawasdf",
        }
    })

    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    })

    it("should return 401 if no token is provided", async () => {
        token = "";

        const res = await exec();

        expect(res.status).toBe(401);

    });
});