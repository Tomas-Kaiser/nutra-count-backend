import request from "supertest";
import mongoose from "mongoose";

import { server } from "../../app";
import { User } from "../../models/User";
import UserDTO from "../../dtos/User";

describe("api/users", () => {
    beforeEach(() => {
    })

    afterEach(async () => {
        jest.restoreAllMocks();
        await User.deleteMany({})
    })

    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    })

    describe("POST /", () => {
        let user: UserDTO;

        const exec = async () => {
            return await request(server)
                .post("/api/users")
                .send(user)
        }

        beforeEach(() => {
            user = {
                name: "Joe",
                email: "joe@gmail.com",
                password: "12345",
                isAdmin: false
            }
        });

        it("should create a user", async () => {
            const res = await exec();

            expect(res.statusCode).toBe(201);
            expect(res.body.result.data.user.name).toBe(user.name);
            expect(res.body.result.data.user.isAdmin).toBeFalsy;

        });

        it("should return name validation err", async () => {
            user.name = "J";

            const res = await exec();

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('"name" length must be at least 3 characters long');

        });

        it("should return err since user is already registered", async () => {

            jest.spyOn(User, "findOne").mockResolvedValue(user);

            const res = await exec();

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('User already registered.');


        });
    });
    describe("PUT /", () => {
        let user: any;
        let token: string;

        const exec = async (id: string) => {
            return await request(server)
                .put(`/api/users/${id}`)
                .set("x-auth-token", token)
                .send(user)
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            user = {
                name: "Tom",
            }
        });

        it("should update name field", async () => {
            const mockUser: UserDTO = {
                name: "John",
                email: "John@gmail.com",
                password: "1234",
                isAdmin: false
            }

            const user = new User(mockUser);
            await user.save();

            const res = await exec(user.id);

            expect(res.statusCode).toBe(200);
            expect(res.body.result.data.user.name).toBe("Tom");
        })

        it("should throw an error when invalid id is passed", async () => {
            const res = await exec("1");

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("Id is not valid!");
        })

        it("should throw a validation error when missing a name field", async () => {
            const id = new mongoose.Types.ObjectId().toHexString();
            delete user.name;

            const res = await exec(id);

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('"name" is required');
        })

        it("should throw an error when givin id is not found in db", async () => {
            const id = new mongoose.Types.ObjectId().toHexString();

            const res = await exec(id);

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Cannot find a user...');
        })
    });
});