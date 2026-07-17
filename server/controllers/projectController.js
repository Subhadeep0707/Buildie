const createProject = (req, res) => {
  console.log(req.body);
  res.json({
    success: true,
    message: "Project received successfully",
  });
};

export default createProject;
