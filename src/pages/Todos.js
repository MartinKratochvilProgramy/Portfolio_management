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
    // send user home if not loged in
    console.log("cred:", credentials);
    if (!credentials) {
      navigate("/");
      return;
    };
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
  }, [credentials, navigate]);
  

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
    <div className="md:px-12 px-2 pt-8 lg:w-6/12 md:w-8/12 w-10/12 m-auto">
      <form onSubmit={addTodo} className="flex flex-col space-y-4 items-center">   
          <label htmlFor ="add-todo" className="sr-only">Add todo</label>
          <div className="relative w-full h-full">
              <input 
                type="text" 
                id="add-todo" 
                className="bg-gray-500 border h-max border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                placeholder="Add new todo..." 
                required="" 
                onChange={(e) => {setTodoText(e.target.value)}} 
                value={todoText}
              />
          </div>
          <button
              type="submit"
              className="flex flex-row px-7 py-3 text-white bg-blue-600 font-medium text-sm leading-snug uppercase rounded whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Add todo
          </button>
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
    <button
      type="submit"
      className="fixed bottom-4 md:top-4 md:bottom-auto right-4 flex flex-row px-7 py-3 text-blue-600 border-solid border-blue-600 border-[1px] bg-white font-medium text-sm leading-snug uppercase rounded whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={logout}
    >
      Logout
    </button>
  </div>
  )
}
