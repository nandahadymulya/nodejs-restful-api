import { ResponseError } from "../errors/response-error.js";
// import { ValidationError } from "joi";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: err.message,
      })
      .end();
  }
  // else if (err instanceof ValidationError) {
  //     res.status(400).json({
  //         errors: err.message
  //     }).end();
  // }
  else {
    res
      .status(500)
      .json({
        errors: err.message,
      })
      .end();
  }
};

export { errorMiddleware };
