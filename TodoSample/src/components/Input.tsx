import React, { ChangeEvent } from 'react';

interface InputProps {
  todo: string;
  setTodo: (value: string) => void;
  handleAddEdit: () => void;
  isEdit: boolean;
}

const Input: React.FC<InputProps> = ({ todo, setTodo, handleAddEdit, isEdit }) => {
  return (
    <div className="input-group">
      <input
        type="text"
        value={todo}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)}
      />
      <button onClick={handleAddEdit}>{isEdit ? "Edit" : "Add"}</button>
      <button onClick={() => setTodo("")}>Clear</button>
    </div>
  );
};

export default Input;
