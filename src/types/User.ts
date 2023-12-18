import jwt from "jsonwebtoken"

export type User = {
    user: string | jwt.JwtPayload
};