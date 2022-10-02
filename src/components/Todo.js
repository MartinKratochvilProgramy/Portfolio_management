import React from 'react'

export default function Todo({ todo, toggleComplete, deleteTodo }) {
    function handleToggleClick() {
        toggleComplete(todo._id);
    }

    function handleDeleteClick() {
      deleteTodo(todo._id);
    }

  return (
    <div>
        <input type="checkbox" checked={todo.done} onChange={handleToggleClick}/>
        <label>{todo.text}</label>
        <button onClick={handleDeleteClick}>Delete</button>
    </div>
  )
}
