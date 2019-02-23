const express = require("express");
const router = express.Router();
const db = require("../dbConfig");

router.post("/", (req, res) => {
  const { description, notes, completed, project_id } = req.body;
  if (!description || !project_id) {
    res
      .status(404)
      .json({ message: "Please enter a description and a project_id" });
  } else {
    db("actions")
      .insert({ description, notes, completed, project_id })
      .then(action => res.status(201).json(action))
      .catch(() => res.status(500).json({ message: "Server error" }));
  }
});

router.get("/", (req, res) => {
  db("actions")
    .then(action => {
      if (action.length === 0) {
        res.status(404).json({ message: "No actions to be found." });
      } else {
        res.status(200).json(action);
      }
    })
    .catch(() => res.status(500).json({ message: "Server error" }));
});

module.exports = router;
