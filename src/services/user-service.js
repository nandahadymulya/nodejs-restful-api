import { getUserValidation } from "../validations/user-validation.js"
import { validate } from "../validations/validation.js";
import { ResponseError } from "../errors/response-error.js";
import { prismaClient } from "../apps/database.js";

const get = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    });

    if (!user) {
        throw new ResponseError(400, "user is not found");
    }

    return user;
}

export default {
    get
}
