const sendResponse = ({ res, status, message, data, ...rest }) => {
  res.status(status).json({ status, message, data, ...rest });
};

module.exports = { sendResponse };
