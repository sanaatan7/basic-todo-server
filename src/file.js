const fs = require("fs");
const path = require("path");

const tasksFilePath = path.join(__dirname, "../tasks.json");

const getFileData = () => {
  const data = fs.readFileSync(tasksFilePath, "utf8");
  const taskObject = data.split(",");
  return taskObject;
};

const saveTaskToFile = (task) => {
  const data = fs.readFileSync(tasksFilePath)
  const tasks = JSON.parse(data)
  tasks.push(task)
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks));
};

module.exports = {
  getFileData,
  saveTaskToFile,
};
