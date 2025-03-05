import { useState } from 'react';
import { Todo } from '../interfaces/types';

function useLocalStorage(key: string, initialValue: Todo[]): [Todo[], (value: Todo[]) => void] {
  const [storedValue, setStoredValue] = useState<Todo[]>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as Todo[] : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: Todo[]) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
