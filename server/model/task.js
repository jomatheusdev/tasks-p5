let mongoose = require("mongoose");

let taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  finished: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
