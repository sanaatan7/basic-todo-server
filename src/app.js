const express = require("express");
const app = express();
const fileMethods = require("./file.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/create-todo", (req, res) => {
  console.log(req.body);
  console.log(typeof req.body);
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
  const tasks = JSON.parse(fileMethods.getFileData())
  
  res.status(200).json(tasks)
})

module.exports = app;
