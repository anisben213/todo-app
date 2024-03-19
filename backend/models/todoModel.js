const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    name: String,
    status: Boolean,
  },
  { versionKey: false }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
