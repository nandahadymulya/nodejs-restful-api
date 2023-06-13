import authService from "../services/auth-service.js";

const signup = async (req, res, next) => {
    try {
        const result = await authService.signup(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    signup
}
