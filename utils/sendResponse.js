const sendResponse = (user, res) => {
  const { password, updatedAt, ...other } = user._doc

  res.status(200).json({
    success: true,
    data: other
  });
}

module.exports = sendResponse
