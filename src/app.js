const express = require("express");
const path = require("path");
const app = express();
const fileMethods = require("./file.js");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.post("/create-todo", (req, res) => {
  try {
    fileMethods.saveTaskToFile(req.body);
    res.status(200).json({
      message: "Task is saved!!!",
    });
  } catch (error) {
    console.error("Error saving task: ", error);
    res.status(500).json({
      message: "Error saving task",
    });
  }
});

app.get("/see-tasks", (req, res) => {
  const tasks = JSON.parse(fileMethods.getFileData());
  res.status(200).json(tasks);
});

module.exports = app;
