import authService from "../services/auth-service.js";

const signUp = async (req, res, next) => {
    try {
        const result = await authService.signUp(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const signIn = async (req, res, next) => {
    try {
        const result = await authService.signIn(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    signUp,
    signIn
}
