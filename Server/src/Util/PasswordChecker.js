// Instance Method
const bcrypt = require("bcrypt");

exports.checkPassword = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
};
