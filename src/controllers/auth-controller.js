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

const signOut = async (req, res, next) => {
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
    signUp,
    signIn,
    signOut
}
