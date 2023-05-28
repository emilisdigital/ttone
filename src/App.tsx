import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Component/Todolist';
import { v1 } from 'uuid';

function App() {
  const tasks1 = [
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false }
  ]
  const tasks2 = [
    { id: v1(), title: "Hello world", isDone: true },
    { id: v1(), title: "I am Happy", isDone: false },
    { id: v1(), title: "Yo", isDone: false }
  ]

  return (
    <div className="App">
      <Todolist title="What to learn" task={tasks1}/>
      <Todolist title="Start" task={tasks2}/>
    </div>
  );
}

export default App;
