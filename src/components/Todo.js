import React from 'react'

export default function Todo({ todo, index, toggleComplete, deleteTodo }) {
    function handleToggleClick() {
        toggleComplete(index);
    }

    function handleDeleteClick() {
      deleteTodo(index);
    }

  return (
    <div key={index}>
        <input type="checkbox" checked={todo.done} onChange={handleToggleClick}/>
        <label>{todo.text}</label>
        <button onClick={handleDeleteClick}>Delete</button>
    </div>
  )
}
