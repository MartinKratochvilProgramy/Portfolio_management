import React, { useState, useContext, useEffect } from 'react'
import Todo from '../components/Todo';
import { CredentialsContext } from '../App';
import { useNavigate  } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [credentials, setCredentials] = useContext(CredentialsContext);
  
  const navigate = useNavigate();
  function logout() {
    setCredentials(null);
    localStorage.setItem('user', null)
    navigate("/");
  }
  
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
    // fetch todos on load
    fetch(`http://localhost:4000/todos`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
    .then((response ) => response.json())
    .then((todos) => setTodos(todos));
  }, [credentials]);
  

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodos = [...todos, {text: todoText, done: false, _id: uuidv4()}];
    setTodos(newTodos);
    setTodoText('');
    persist(newTodos);
  }

  function toggleTodo(id) {
    const newTodoList = [...todos];
    const todoToChange = newTodoList.find((todo) => todo._id === id);
    console.log(newTodoList[0]._id);
    todoToChange.done = !todoToChange.done;
    setTodos(newTodoList);
    persist(newTodoList);
  }

  function deleteTodo(id) {
    const newTodoList = [...todos];
    newTodoList.splice(id, 1)
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
        {todos.map((todo) => {
          return (
            <Todo 
              todo={todo} 
              key={todo._id} 
              toggleComplete={toggleTodo}
              deleteTodo={deleteTodo} />
          )
        })}
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  )
}
