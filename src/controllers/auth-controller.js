import authService from "../services/auth-service.js";

const signup = async (req, res, next) => {
  try {
    const result = await authService.signup(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await authService.signin(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const signout = async (req, res, next) => {
  try {
    await authService.signout(req.user.username);
    res.status(200).json({
      message: "sign out succeed",
    });
  } catch (e) {
    next();
  }
};

export default {
  signup,
  signin,
  signout,
};
