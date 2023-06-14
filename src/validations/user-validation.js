import Joi from "joi";

const getUserValidation = Joi.string().max(100).required();

export {
    getUserValidation
}
