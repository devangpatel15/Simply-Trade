const payment = require("../models/payment");
const { getAllPaymentService, getPaymentService, createPaymentService, updatePaymentService, softDeletePaymentService, deletePaymentService } = require("../services/payment");

exports.getAllPayment = async (req, res) => {
  try {
    const payment = await getAllPaymentService();
    if (!payment) {
      return res.status(404).json({ message: "No Payment found" });
    }

    return res.status(200).json({
      message: "Payment retrieved successfully",
      data: payment,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await getPaymentService(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "No Payment found" });
    }

    return res.status(200).json({
      message: "Payment retrieved successfully",
      data: payment,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const newPayment = req.body;
    const createdPayment = await createPaymentService(newPayment);

    return res
      .status(200)
      .json({ message: "Payment created", data: createdPayment });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = req.body;
    const updatedPayment = await updatePaymentService(paymentId, payment);
    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res
      .status(200)
      .json({ message: "Payment updated", data: updatedPayment });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.softDeletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await softDeletePaymentService(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res
      .status(200)
      .json({ message: "Payment soft deleted", data: payment });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await deletePaymentService(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ message: "Payment deleted", data: payment });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
