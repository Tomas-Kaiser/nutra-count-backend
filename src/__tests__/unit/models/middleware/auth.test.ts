import { User } from "../../../../models/User";
import { auth } from "../../../../middleware/auth";

import mongoose from "mongoose";

describe("auth middleware", () => {
    it("should populate req.user with the payload of a valid JWT", () => {
        const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true }
        const token = new User(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        } as any
        const res = {} as any;
        const next = jest.fn()
        auth(req, res, next);

        expect(req.user).toBeDefined();
    });
});