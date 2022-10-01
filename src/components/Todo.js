import React from 'react'

export default function Todo({ todo, index, toggleComplete }) {
    function handleRemoveClick() {
        toggleComplete(index);
    }

  return (
    <div key={index}>
        <input type="checkbox" checked={todo.done} onChange={handleRemoveClick}/>
        <label>{todo.text}</label>
    </div>
  )
}
