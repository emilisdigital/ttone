import React from "react"
import { useState } from "react"
import { FilterValueType } from "../App"

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}
export const Todolist = ({ title, tasks, removeTask, changeFilter, addTask, changeTaskStatus }: TodolistPropsType) => {
    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState<string | null>(null)
    console.log(error)
    const inputValueOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
    const onKeyPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() !== '') { addTask(inputValue.trim()); setInputValue('') }
            else {setError('Title is required')}
        } 
    }
    const addTaskOnClick = () => {
        if (inputValue.trim() !== '') {
            addTask(inputValue.trim()); setInputValue('')
        } else { setError('Title is required') }
    }
    const changeFilterAll = () => changeFilter('all')
    const changeFilterActive = () => changeFilter('active')
    const changeFilterCompleted = () => changeFilter('completed')
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={inputValue} onChange={inputValueOnChange} onKeyPress={onKeyPressEnter} className={error ? 'error' : ''} />
                <button onClick={addTaskOnClick}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks.map(t => {
                    const removeTaskOnClick = () => removeTask(t.id)
                    const changeTaskStatusOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
                        let newChecked = e.currentTarget.checked
                        changeTaskStatus(t.id, newChecked)
                    }
                    return <li key={t.id}>
                        <input type='checkbox' checked={t.isDone} onChange={changeTaskStatusOnClick} />
                        <span>{t.title}</span><button onClick={removeTaskOnClick}>X</button></li>
                })}
            </ul>
            <div>
                <button onClick={changeFilterAll}>All</button>
                <button onClick={changeFilterActive}>Active</button>
                <button onClick={changeFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}