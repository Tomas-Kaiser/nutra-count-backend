import jwt from "jsonwebtoken"

import { Schema, model } from 'mongoose';

interface User {
    name: string;
    email: string;
    password: string;
    generateAuthToken: () => string;
}

let userSchema = new Schema<User>({
    name: {
        type: String,
        min: 4,
        max: 255,
        required: true
    },
    email: {
        type: String,
        min: 4,
        max: 255,
        unique: true,
        required: true
    },
    password: {
        type: String,
        min: 4,
        max: 1024,
        required: true
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, `${process.env.JWT_PRIVATE_KEY_NUTRA_CHECK_BACKEND}`);

    return token;
}

export const User = model<User>("User", userSchema)

