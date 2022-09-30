import React, { useState } from 'react'

export default function Todos() {
  const [todos, setTodos] = useState([{
      text: 'hello world', 
      done: true,
      id: new Date().getTime()}]);
  const [todoText, setTodoText] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    setTodos([...todos, {text: todoText, done: false}]);
    setTodoText('');
  }

  function handleCheckboxClick(todo) {
    todo.done = true;
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <input type="text" 
            onChange={(e) => {setTodoText(e.target.value)}} 
            value={todoText}/>
        <button type="submit">Add todo</button>
      </form>
      <br />
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <input type="checkbox" checked={todo.done} onChange={handleCheckboxClick(todo)}/>
              <label>{todo.text}</label>
            </div>
          )
        })}
    </div>
  )
}
