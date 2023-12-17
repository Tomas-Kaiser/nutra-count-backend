import { Schema, model } from 'mongoose';

interface User {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<User>({
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
})

export const User = model<User>("User", userSchema)

