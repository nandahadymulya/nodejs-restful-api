import authService from "../services/auth-service.js";

const signup = async (req, res, next) => {
    try {
        const result = await authService.signUp(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const signin = async (req, res, next) => {
    try {
        const result = await authService.signIn(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const signout = async (req, res, next) => {
    try {
        await authService.signOut(req.user.username);
        res.status(200).json({
            data: "sign out succeed"
        });
    } catch (e) {
        next();
    }
}

export default {
    signup,
    signin,
    signout
}
