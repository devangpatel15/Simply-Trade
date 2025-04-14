const { body, check, validationResult, param } = require("express-validator");

exports.createSellData = [
  body("organization")
    .isMongoId()
    .notEmpty()
    .withMessage("organization must be a valid MongoID and is required"),
  body("branch")
    .isMongoId()
    .notEmpty()
    .withMessage("organizationBranch must be a valid MongoID and is required"),
  body("customerName")
    .isMongoId()
    .notEmpty()
    .withMessage("customerName is required"),
  body("email").isEmail().notEmpty().withMessage("email is required"),

  check("device")
    .isArray({ min: 1 })
    .withMessage("device must be an array with at least one item"),
  check("device.*.modelName")
    .isMongoId()
    .notEmpty()
    .withMessage("modelName must be a valid MongoID and is required"),
  check("device.*.deviceName")
    .isMongoId()
    .notEmpty()
    .withMessage("deviceName must be a valid MongoID and is required"),
  check("device.*.amount")
    .isNumeric()
    .notEmpty()
    .withMessage("amount must be a number and is required"),
  check("device.*.customerPaid")
    .isNumeric()
    .notEmpty()
    .withMessage("customerPaid must be a number and is required"),
  check("device.*.remainingAmount")
    .isNumeric()
    .notEmpty()
    .withMessage("remainingAmount must be a number and is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.getSellValidation = [
  param("id").optional().isMongoId().withMessage("valid id required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
exports.deleteSellValidation = [
  param("id").isMongoId().withMessage("valid id required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.updateSellData = [
  body("organization")
    .isMongoId()
    .optional()
    .withMessage("organization must be a valid MongoID and is required"),
  body("branch")
    .isMongoId()
    .optional()
    .withMessage("organizationBranch must be a valid MongoID and is required"),
  body("customerName")
    .isMongoId()
    .optional()
    .withMessage("customerName is required"),
  body("email").isEmail().optional().withMessage("email is invalid"),

  body("modelName").isMongoId().optional().withMessage("model in string"),
  body("deviceName").isMongoId().optional().withMessage("device in string"),
  body("amount").isNumeric().optional().withMessage("Amount in Number"),
  body("customerPaid")
    .isNumeric()
    .optional()
    .withMessage("customerPaid in Number"),
  body("remainingAmount")
    .isNumeric()
    .optional()
    .withMessage("remainingAmount in Number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
