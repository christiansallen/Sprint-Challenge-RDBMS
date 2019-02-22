const express = require("express");
const router = express.Router();
const db = require("../dbConfig");

router.post("/", (req, res) => {
  const { name, description, completed } = req.body;
  if (!name || !description) {
    res.status(404).json({
      message: "Please enter a name and description for the project."
    });
  } else {
    db("projects")
      .insert({ name, description, completed })
      .then(project => res.status(201).json(project))
      .catch(() => res.status(500).json({ message: "Server error." }));
  }
});

router.get("/", (req, res) => {
  db("projects")
    .then(project => {
      if (project.length === 0) {
        res.status(404).json({ message: "There are no projects" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(() => res.status(500).json({ message: "Server error" }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .where({ id: id })
    .first()
    .then(project => {
      if (project.length === 0) {
        res.status(404).json({ message: "There is no project with that id." });
      } else {
        db("actions")
          .where({ project_id: id })
          .then(action => {
            project.actions = action;
            res.status(200).json(project);
          });
      }
    })
    .catch(() => res.status(500).json({ message: "Server error" }));
});

module.exports = router;
