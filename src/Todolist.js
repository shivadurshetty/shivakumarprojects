import React from 'react';

const Todolist = ({ todos, onDelete, onToggle }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index} className='list-group mt-2'>
          <ul className="list-group-item">
            {todo.task} &nbsp;
            <span>Timer: {todo.timer} seconds</span>
            <button onClick={() => onToggle(index)} className='btn btn-success'>
              {todo.isRunning ? 'Pause' : 'Resume'}
            </button>
            <button onClick={() => onDelete(index)} className='btn'> <lord-icon
    src="https://cdn.lordicon.com/nqtddedc.json"
    trigger="hover"
  >
</lord-icon></button>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Todolist;
