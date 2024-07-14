import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");   // HTTP 400 "Bad request"
        }

        // These checks are technically not needed because of the schema marking these params as "unique"
        // It's a good second check in place to give better error messages and make sure nothing goes wrong

        const existingUsername = await UserModel.findOne({ username: username }).exec()

        if (existingUsername) {
            throw createHttpError(409, "Username already taken")   // HTTP 409 "Conflict"
        }

        const existingEmail = await UserModel.findOne( { email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists")   // HTTP 409 "Conflict"
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }
};