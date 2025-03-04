import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [todos, setTodos] = useState<string[]>(checkLocal());
  const [todo, setTodo] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleEdit = (index: number) => {
    setTodo(todos[index]);
    setIsEdit(true);
    setSelectedIndex(index);
  };

  function checkLocal() {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  }

  const handleAddEdit = () => {
    if (isEdit) {
      const updatedTodos = todos.map((item, index) =>
        index === selectedIndex ? todo : item
      );
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, todo]);
    }
    setTodo("");
    setIsEdit(false);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className="title">Todo List</div>
      <div className="input-group">
        <input
          type="text"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button onClick={handleAddEdit}>{isEdit ? "Edit" : "Add"}</button>
        <button onClick={() => setTodos([])}>Delete all</button>
      </div>
      <ul className="todo-list">
        {todos.map((item, index) => (
          <li key={index}>
            {item}
            <div>
              <button
                onClick={() => {
                  setTodos(todos.filter((_, i) => i !== index));
                }}
              >
                Delete
              </button>
              <button onClick={() => handleEdit(index)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
