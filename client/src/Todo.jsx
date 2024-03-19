export default function Todo({ todo, setTodos }) {
  const updateTodo = async (todoId, todoStatus) => {
    console.log(
      "Mise à jour du todo avec ID:",
      todoId,
      "Nouveau statut:",
      todoStatus
    );
    const res = await fetch(`/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: todoStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Réponse reçue:", res);

    const json = await res.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        console.log("l'etat avant mis a jour:", currentTodos);
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          console.log("l'etat apres mis a jour:", currentTodos);
          return currentTodo;
        });
      });
    } else {
      console.log("not acknowloged");
    }
  };

  const deleteTodo = async (todoId) => {
    const res = await fetch(`/todos/${todoId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const text = await res.text(); // Récupère la réponse en tant que texte
      console.error("Erreur de requête:", text);
      return;
  }
    const json = await res.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
      });
    }
  };

  return (
    <div className="todo">
      <p className={`${todo.status ? "todo__name--completed" : ""}`}>{todo.name}</p>
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() => updateTodo(todo._id, todo.status)}
        >
          {todo.status ? "☑" : "☐"}
        </button>
        <button className="todo__delete icon-delete" onClick={() => deleteTodo(todo._id)}>
      
        </button>
      </div>
    </div>
  );
}
