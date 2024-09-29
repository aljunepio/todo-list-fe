import { useState } from "react";

function App() {
  const [todos, setTodos] = useState(["sample1", "sample2"]);
  const [todo, setTodo] = useState("");

  return (
    <div>
      <div>
        <span>todo</span>
        <input
          type="text"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setTodo("");
            setTodos([...todos, todo]);
          }}
        >
          add
        </button>
        <button onClick={() => setTodos([])}>clear all</button>
      </div>
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {todos.map((item, index) => {
            return (
              <div key={index}>
                {item}
                <button
                  onClick={() => {
                    setTodos(todos.filter((_, i) => i !== index));
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;