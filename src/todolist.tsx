import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

type PropsType = {
  id:string
  title: string,
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId:string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) { // props = {title: "what to learn"}

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      props.addTask(newTaskTitle, props.id)
      setNewTaskTitle('')
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id)
      setNewTaskTitle('')
    } else {
      setError('Title if required')
    }

  }
  const onAllClickHandler = () => { props.changeFilter("all", props.id) }
  const onCompletedClickHandler = () => { props.changeFilter("completed",props.id) }
  const onActiveClickHandler = () => { props.changeFilter("active",props.id) }

  const removeTodolist = ()=>{
    props.removeTodolist(props.id)
  }

  return (
    <div>
      <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
      <div>
        <input type="text"
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ""} />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type="checkbox" onChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
          }}
            checked={t.isDone} /><span>{t.title}</span>
            <button onClick={() => props.removeTask(t.id, props.id)}>x</button></li>)
        }
      </ul>
      <div>
        <button className={props.filter === "all" ? 'active-filter' : ''}
          onClick={onAllClickHandler}>All</button>
        <button className={props.filter === "active" ? 'active-filter' : ''}
          onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === "completed" ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}