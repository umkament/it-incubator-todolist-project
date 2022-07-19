import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import './App.css';

export type TasksType = {
  id: string
  isDone: boolean
  title: string
}

export type PropsType = {
  id: string
  title: string
  tasks: Array<TasksType>
  filter: FilterValueType
  addTask: (title: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
  changeTasksFilter: (value: FilterValueType, todolistId: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

  let [taskTitle, setTaskTitle] = useState("")
  let [error, setError] = useState<string>('')

  const taskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    /* if (e.currentTarget.value.trim() === "") {
       setError("title is required")
     }*/ // это условие лишнее
  }
  const taskTitleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

    setError('')
    if (e.charCode === 13 && taskTitle.trim() !== "") {
      props.addTask(taskTitle.trim(), props.id);
      setTaskTitle("")
    }
    if (e.charCode === 13 && taskTitle.trim() === "") {
      setError("title is required")
    }

  }
  const addTaskButtonClickHandler = () => {
    if (taskTitle.trim() !== "") {
      props.addTask(taskTitle.trim(), props.id);
      setTaskTitle("")
    } else {
      setError("title is required")
    }
  }

  const removeTodolistHandler = () => {props.removeTodolist(props.id)}

  const selectAllHandler = () => {
    props.changeTasksFilter("all", props.id)
  }
  const selectCompletedHandler = () => {
    props.changeTasksFilter("completed", props.id)
  }
  const selectActiveHandler = () => {
    props.changeTasksFilter("active", props.id)
  }


  return (
     <div>
       <h3>{props.title} <button onClick={removeTodolistHandler}>x</button></h3>

       <div>
         <input
            value={taskTitle}
            onChange={taskTitleChangeHandler}
            onKeyPress={taskTitleKeyPressHandler}
            className={error ? "error" : ""}
         />
         <button onClick={addTaskButtonClickHandler}>+</button>
         {error && <div className="error-message">{error}</div>}
       </div>
       <ul>
         {props.tasks.map(t => {

           const removeTaskHandler = () => {
             props.removeTask(t.id, props.id)
           }
           const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
             props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
           }

           return <li key={t.id} className={t.isDone ? "is-done" : ""}>
             <button onClick={removeTaskHandler}>x</button>
             <input type="checkbox" onChange={changeTaskStatusHandler} checked={t.isDone}/>
             <span>{t.title}</span>
           </li>
         })}
       </ul>
       <div>
         <button className={props.filter === "all" ? "active-filter" : ""} onClick={selectAllHandler}>All</button>
         <button className={props.filter === "active" ? "active-filter" : ""} onClick={selectActiveHandler}>Active
         </button>
         <button className={props.filter === "completed" ? "active-filter" : ""}
                 onClick={selectCompletedHandler}>Completed
         </button>
       </div>
     </div>
  );
}
