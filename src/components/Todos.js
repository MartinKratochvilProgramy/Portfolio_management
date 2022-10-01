import React, { useState, useContext, useEffect } from 'react'
import Todo from './Todo';
import { CredentialsContext } from '../App';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [credentials] = useContext(CredentialsContext);
  
  const persist = (newTodos) => {
    // hit the endpoint and write to db
    fetch(`http://localhost:4000/todos`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials.username}:${credentials.password}`
      },
      body: JSON.stringify({
        newTodos, 
      })
    })
  };

  useEffect(() => {
    fetch(`http://localhost:4000/todos`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
    .then((response ) => response.json())
    .then((todos) => setTodos(todos));
  }, []);
  

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    setTodos([...todos, {text: todoText, done: false}]);
    const newTodos = [...todos, {text: todoText, done: false}];
    setTodoText('');
    persist(newTodos);
  }

  function toggleComplete(index) {
    const newTodoList = [...todos];
    newTodoList[index].done = !newTodoList[index].done;
    setTodos(newTodoList);
    persist(newTodoList);
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
            <Todo todo={todo} key={index} index={index} toggleComplete={toggleComplete} />
          )
        })}
    </div>
  )
}
