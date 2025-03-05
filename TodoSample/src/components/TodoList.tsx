import React from 'react';
import { Todo } from '../interfaces/types';

interface TodoListProps {
  todos: Todo[];
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, handleEdit, handleDelete }) => {
  return (
    <ul className="todo-list">
      {todos.map((item, index) => (
        <li key={item.id}>
          {item.text}
          <div>
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
