const { body, query, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

exports.AuthUser = (req, res, next) => {
  // const token = req.headers("Authorization");
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "token is required" });
  }
  try {
    const jwtToken = token.split(" ")[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "token invalid" });
  }
};

exports.validateCreateData = [
  body("name").isString().notEmpty().withMessage("name is required"),
  body("email").isEmail().notEmpty().withMessage("email is required"),
  body("password").isString().notEmpty().withMessage("password is string"),
  body("mobileNo").isString().notEmpty().withMessage("number in string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateGetOneUserData = [
  query("id").optional().isMongoId().withMessage("valid id required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
exports.validateDeleteUserData = [
  query("id").isMongoId().withMessage("valid id required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateUpdateUserData = [
  body("name").optional().isString().withMessage("name is required"),
  body("email").optional().isEmail().withMessage("email is required"),
  body("password").optional().isString().withMessage("password is string"),
  body("mobileNo").optional().isString().withMessage("number in string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
