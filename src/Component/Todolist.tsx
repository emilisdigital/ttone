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
}

export const Todolist = ({ title, tasks, removeTask, changeFilter, addTask }: TodolistPropsType) => {
    let [inputValue, setInputValue] = useState('')
    const inputValueOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
    const onKeyPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputValue !== '') addTask(inputValue); setInputValue('')
        }
    }
    const addTaskOnClick = () => { addTask(inputValue); setInputValue('') }
    const changeFilterAll = () => changeFilter('all')
    const changeFilterActive = () => changeFilter('active')
    const changeFilterCompleted = () => changeFilter('completed')
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={inputValue} onChange={inputValueOnChange} onKeyPress={onKeyPressEnter} />
                <button onClick={addTaskOnClick}>+</button>
            </div>
            <ul>
                {tasks.map(t => {
                    const removeTaskOnClick = () => removeTask(t.id)
                    return <li key={t.id}>
                        <input type='checkbox' checked={t.isDone} /><span>{t.title}</span><button onClick={removeTaskOnClick}>X</button></li>
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