export const validation = (schema) => (req, res, next) => {
  try {
    const validate = schema.parse(req.body);
    req.body = validate;
    next();
  } catch (error) {
    console.log("Error in validation ", error);
    const formattedErrors = error.issues.map((err) => {
      return { field: err.path[0], message: err.message };
    });
    return res.status(400).json({
      message: "Validation failed",
      error: formattedErrors,
    });
  }
};
