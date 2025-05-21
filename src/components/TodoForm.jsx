import React, { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [task, setTask] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAdd(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={submit} className="">
     
    </form>
  );
}
