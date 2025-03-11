const Capacity = require("../models/capacity");

exports.getAllCapacityService = async () => {
  return await Capacity.find().lean();
};

exports.getCapacityService = async (catId) => {
  return await Capacity.findById(catId).lean();
};

exports.createCapacityService = async (newCat) => {
  return await Capacity.create(newCat)
};

exports.updateCapacityService = async (catId, cat) => {
  return await Capacity.findByIdAndUpdate(catId, cat,{new:true}).lean();
};

exports.deleteCapacityService = async (catId) => {
  return await Capacity.findByIdAndDelete(catId);
};
