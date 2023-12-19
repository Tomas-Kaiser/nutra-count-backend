import jwt from "jsonwebtoken";
import { User } from "../../../models/User";
import mongoose from "mongoose";

describe("user.generateAuthToken", () => {
    it("should return a valid JWT", () => {
        // Arrange
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true
        }
        console.log("payload: ", payload._id)
        const user = new User(payload);

        // Act
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, `${process.env.JWT_PRIVATE_KEY_NUTRA_CHECK_BACKEND}`);

        // Assert
        expect(decoded).toMatchObject(payload);

    });
});