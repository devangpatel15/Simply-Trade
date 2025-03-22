const Account = require("../models/account");

exports.getAllAccountService = async () => {
  const pay = await Account.find({ isDeleted: false }).lean();
console.log(pay);

  return pay
};

exports.getAccountService = async (accountId) => {
  return await Account.findById(accountId).populate("organization brachName").lean();
};

exports.createAccountService = async (newAccount) => {
  return await Account.create(newAccount);
};

exports.updateAccountService = async (accountId, account) => {
  return await Account.findByIdAndUpdate(accountId, account, {
    new: true,
  }).lean();
};

exports.softDeleteAccountService = async (accountId) => {
  return await Account.findByIdAndUpdate(accountId, { isDeleted: true });
};

exports.deleteAccountService = async (accountId) => {
  return await Account.findByIdAndDelete(accountId);
};
