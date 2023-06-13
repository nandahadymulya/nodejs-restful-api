import { signUpAuthValidation } from "../validations/auth-validation.js";
import { prismaClient } from "../apps/database.js";
import { ResponseError } from "../errors/response-error.js";
import { validate } from "../validations/validation.js";
import bcrypt from "bcrypt";

const signup = async (request) => {
    const auth = validate(signUpAuthValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: auth.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, 'Username already exists');
    }

    auth.password = await bcrypt.hash(auth.password, 10);

    return prismaClient.user.create({
        data: auth,
        select: {
            username: true,
            name: true
        }
    });
}

export default {
    signup
}
