import { signInAuthValidation, signUpAuthValidation } from "../validations/auth-validation.js";
import { prismaClient } from "../apps/database.js";
import { ResponseError } from "../errors/response-error.js";
import { validate } from "../validations/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const signUp = async (request) => {
    const signUpRequest = validate(signUpAuthValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: signUpRequest.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(401, "username already exists");
    }

    signUpRequest.password = await bcrypt.hash(signUpRequest.password, 10);

    return prismaClient.user.create({
        data: signUpRequest,
        select: {
            username: true,
            name: true
        }
    });
}

const signIn = async (request) => {
    const signInRequest = validate(signInAuthValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: signInRequest.username,
        },
        select: {
            username: true,
            password: true
        }
    })

    if (!user) {
        throw new ResponseError(401, "username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(signInRequest.password, user.password)
    if (!isPasswordValid) {
        throw new ResponseError(401, "username or password wrong");
    }

    const token = uuid().toString();
    return prismaClient.user.update({
        data: {
            token,
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    })
}

export default {
    signUp,
    signIn
}
