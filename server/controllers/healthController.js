const getHealth = (req, res) => {
  res.json({
    success: true,
    message: "Buildie API is running",
    version: "1.0.0",
  });
};

export default getHealth;