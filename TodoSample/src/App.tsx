import React, { useState } from 'react';
import './App.scss';
import useLocalStorage from './customHooks/useLocalStorage';
import { Todo } from './interfaces/types';
import Input from './components/Input';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todo, setTodo] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleEdit = (index: number) => {
    setTodo(todos[index].text);
    setIsEdit(true);
    setSelectedIndex(index);
  };

  const handleAddEdit = () => {
    if (isEdit) {
      const updatedTodos = todos.map((item, index) =>
        index === selectedIndex ? { ...item, text: todo } : item
      );
      setTodos(updatedTodos);
    } else {
      const newTodo: Todo = { id: Date.now(), text: todo };
      setTodos([...todos, newTodo]);
    }
    setTodo('');
    setIsEdit(false);
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="title">Todo List</div>
      <Input todo={todo} setTodo={setTodo} handleAddEdit={handleAddEdit} isEdit={isEdit} />
      <TodoList todos={todos} handleEdit={handleEdit} handleDelete={handleDelete} />
      <button className="delete-all-button" onClick={() => setTodos([])}>Delete all</button>
    </div>
  );
}

export default App;
