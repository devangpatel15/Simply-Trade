const { body, param, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

exports.createValidation = [
  body("organization")
    .isString()
    .notEmpty()
    .withMessage("organization is required"),
  body("branch").isString().notEmpty().withMessage("branch is required"),
  body("customerName").isString().notEmpty().withMessage("customerName is string"),
  body("customerPhone").isString().notEmpty().withMessage("customerPhone in string"),
  body("categoryName").isMongoId().notEmpty().withMessage("category in string"),
  body("modelName").isMongoId().notEmpty().withMessage("model in string"),
  body("deviceName").isMongoId().notEmpty().withMessage("device in string"),
  body("capacityName").isMongoId().notEmpty().withMessage("capacity in string"),
  body("color").isMongoId().notEmpty().withMessage("color in string"),
  body("imeiNo").isString().optional().withMessage("imeiNo in string"),
  body("srNo").isString().optional().withMessage("srNo in string"),
  body("totalAmount").isNumeric().notEmpty().withMessage("totalAmount in boolean"),
  body("paidToCustomer").isNumeric().notEmpty().withMessage("paidToCustomer in string"),
  body("remainingAmount").isNumeric().notEmpty().withMessage("remainingAmount in string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.getStockValidation = [
    param("id").optional().isMongoId().withMessage("valid id required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
exports.deleteStockValidation = [
    param("id").isMongoId().withMessage("valid id required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.updateStockValidation = [
  body("organization")
  .isString()
  .optional()
  .withMessage("organization is required"),
body("branch").isString().optional().withMessage("branch is required"),
body("customerName").isString().optional().withMessage("customerName is string"),
body("customerPhone").isString().optional().withMessage("customerPhone in string"),
body("categoryName").isMongoId().optional().withMessage("category in string"),
body("modelName").isMongoId().optional().withMessage("model in string"),
body("deviceName").isMongoId().optional().withMessage("device in string"),
body("capacityName").isMongoId().optional().withMessage("capacity in string"),
body("color").isMongoId().optional().withMessage("color in string"),
body("imeiNo").isString().optional().withMessage("imeiNo in string"),
body("srNo").isString().optional().withMessage("srNo in string"),
body("totalAmount").isNumeric().optional().withMessage("totalAmount in boolean"),
body("paidToCustomer").isNumeric().optional().withMessage("paidToCustomer in string"),
body("remainingAmount").isNumeric().optional().withMessage("remainingAmount in string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
