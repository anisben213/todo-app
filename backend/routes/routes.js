const express = require("express");
const Todo = require("../models/todoModel");
const router = express.Router();
const bodyParser = require("body-parser");

// GET todos
router.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});
// POST todos
router.post("/todos", async (req, res) => {
  try {
    const todo = Todo(req.body);

    if (!todo) {
      return res.status(400).json({ message: "todo not found" });
    }
    if (typeof todo.name !== "string") {
      return res.status(400).json({ message: "name must be a string" });
    }

    const result = await todo.save();
    await res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// DELETE todos
router.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if(deletedTodo) {
    res.json({ acknowledged: true, todo: deletedTodo })
  } else {
    res.status(404).json({acknowledged : false, message :"failed to delete"})
  }
});
// PUT todos
router.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    console.log(update);

    // Vérifie si `status` est présent et est un booléen
    if ('status' in update && typeof update.status !== "boolean") {
      return res.status(400).json({ message: "Status must be a boolean." });
    }

    // Étape 1: Récupérer le document actuel pour connaître la valeur de `status`
    const todo = await Todo.findById(id);
    console.log("this is is todo" + todo);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    // Étape 2: Inverser la valeur de `status` et mettre à jour le document
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: { status: !update.status } }, // Inverse la valeur de `status`
      { new: true }
    );
    if (updatedTodo) {
      // Si `findByIdAndUpdate` a retourné un document, l'opération est "acknowledged"
      return res.json({ acknowledged: true, todo: updatedTodo });
    } else {
      // Si aucun document n'est retourné, l'ID n'était probablement pas valide
      return res.status(404).json({ acknowledged: false, message: "Todo not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "An error occurred." });
  }
});

module.exports = router;
