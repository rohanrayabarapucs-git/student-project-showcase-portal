const Project = require("../models/project");

exports.addProject = async (req, res) => {
  try {
    const screenshots = req.files.map((f) => f.path);

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies.split(","),
      github_link: req.body.github_link,
      category: req.body.category,
      batch: req.body.batch,
      studentId: req.user.id,
      screenshots,
    });

    await project.save();
    res.json({ message: "Project added", project });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAllApproved = async (req, res) => {
  const projects = await Project.find({ status: "Approved" });
  res.json(projects);
};

exports.getPending = async (req, res) => {
  const projects = await Project.find({ status: "Pending" });
  res.json(projects);
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updated);
};