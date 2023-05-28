import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Component/Todolist';
import { v1 } from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistsType = {
  id: string,
  title: string,
  filter: FilterValueType
}


function App() {
  
  let [filter, setFilter] = useState<FilterValueType>('all')

  const [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to buy', filter: 'all' },
  ]
  )


  let [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false }
  ])

  const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id))
  const changeFilter = (filter: FilterValueType) => setFilter(filter)
  const addTask = (title: string) => setTasks([...tasks, { id: v1(), title, isDone: false }])
  const changeTaskStatus = (id: string, isDone: boolean) => setTasks(tasks.map(t => t.id === id ? { ...t, isDone } : t))

  let taskForTodolist = []
  switch (filter) {
    case "active": taskForTodolist = tasks.filter(t => t.isDone === false); break
    case "completed": taskForTodolist = tasks.filter(t => t.isDone === true); break
    default: taskForTodolist = tasks
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={taskForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus} />
    </div>
  );
}

export default App;
