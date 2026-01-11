const { v4: uuidv4 } = require("uuid");

/**
 * Generates a unique session token using UUID v4
 * @returns {string} A unique session token
 */
const generateToken = () => {
  return uuidv4();
};

module.exports = {
  generateToken,
};
