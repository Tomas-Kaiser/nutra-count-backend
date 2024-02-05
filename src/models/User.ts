import jwt from "jsonwebtoken";

import { Schema, model } from 'mongoose';

interface User {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    weight: string;
    generateAuthToken: () => string;
}

let userSchema = new Schema<User>({
    name: {
        type: String,
        min: 3,
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
    },
    isAdmin: { type: Boolean, default: false },
    weight: {
        type: String,
        min: 2,
        max: 5,
        trim: true,
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, `${process.env.JWT_PRIVATE_KEY_NUTRA_CHECK_BACKEND}`);

    return token;
}

export const User = model<User>("User", userSchema)

