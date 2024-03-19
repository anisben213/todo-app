import { useState } from "react";
import { useEffect } from "react";
import  Todo  from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await fetch("/todos");
        const todos = await res.json();
        setTodos(todos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    }
    getTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/todos", {
        method: "POST",
        body: JSON.stringify({ name: content, status: false }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();
      setContent("");
      setTodos([...todos, newTodo]);
    }
  };
  
  return (
    <main className="container">
      <h1 className="title">Task Manager</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new todo..."
          required
          className="form__input"
        />
        <button type="submit" className="addButton">Add Todo</button>
      </form>
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos}   />
          ))
}      
 </div>
                
          
    </main>
  );
}
