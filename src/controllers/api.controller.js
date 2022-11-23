// Error 404
getError404 = (req, res) => {
  res.status(404).json({ message: "Error 404" });
};

module.exports = {
  getError404,
};
