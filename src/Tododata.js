import React, { useState, useEffect } from 'react';
import './App.css';
import Todolist from './Todolist';

function App() {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem('todoList'));
    if (savedTodoList) {
      setTodoList(savedTodoList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const changeHandler = (e) => {
    setTask(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (task === '') {
      alert('You must enter something!');
      return;
    }
    const newTodo = { task, timer: 0, isRunning: true };
    setTodoList([...todoList, newTodo]);
    setTask('');
  };

  const deleteTask = (index) => {
    const updatedTodos = [...todoList];
    updatedTodos.splice(index, 1);
    setTodoList(updatedTodos);
  };

  const toggleTimer = (index) => {
    const updatedTodos = [...todoList];
    updatedTodos[index].isRunning = !updatedTodos[index].isRunning;
    setTodoList(updatedTodos);
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const updatedTodos = [...todoList];
      updatedTodos.forEach((todo, index) => {
        if (todo.isRunning) {
          updatedTodos[index].timer += 1;
        }
      });
      setTodoList(updatedTodos);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [todoList]);

  return (
    <div className='container'>
      <h3 className='text-center'>Todo list App</h3>
      <div>
        <form className='input-group' onSubmit={submitHandler}>
          <input type='text' className='form-control' value={task} onChange={changeHandler} />
          &nbsp;
          <input type='submit' value='Add' name='add' className='btn btn-primary' />
        </form>
        <Todolist todos={todoList} onDelete={deleteTask} onToggle={toggleTimer} />
      </div>
    </div>
  );
}

export default App;
