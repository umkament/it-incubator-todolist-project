import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import './App.css';

export type TasksType = {
  id: string
  isDone: boolean
  title: string
}

export type PropsType = {
  title: string
  tasks: Array<TasksType>
  filter: FilterValueType
  addTask: (title: string)=>void
  removeTask: (id: string)=> void
  changeTasksFilter: (value: FilterValueType)=> void
  changeTaskStatus: (taskID: string, isDone:boolean)=>void
}

export function Todolist(props: PropsType) {

  let [taskTitle, setTaskTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const taskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }
  const taskTitleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      props.addTask(taskTitle.trim());
      setTaskTitle("")
    }
    if (taskTitle.trim() === "") {
      setError("title is required")
    } else {
     return;
    }
  }
  const addTaskButtonClickHandler = () => {
    if (taskTitle.trim() !== "") {
      props.addTask(taskTitle.trim());
      setTaskTitle("")
    } else {
      setError("title is required")
    }
  }

  const selectAllHandler = () => {
    props.changeTasksFilter("all")
  }
  const selectCompletedHandler = () => {
    props.changeTasksFilter("completed")
  }
  const selectActiveHandler = () => {
    props.changeTasksFilter("active")
  }


  return (
     <div>
       <h3>{props.title}</h3>
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
             props.removeTask(t.id)
           }
           const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
             props.changeTaskStatus(t.id, e.currentTarget.checked)
           }

           return <li key={t.id} className={t.isDone ? "is-done": ""}>
             <button onClick={removeTaskHandler}>x</button>
             <input type="checkbox" onChange={changeTaskStatusHandler} checked={t.isDone}/>
             <span>{t.title}</span>
           </li>
         })}
       </ul>
       <div>
         <button className={props.filter === "all"? "active-filter" : ""} onClick={selectAllHandler}>All</button>
         <button className={props.filter === "active"? "active-filter" : ""} onClick={selectActiveHandler}>Active</button>
         <button className={props.filter === "completed"? "active-filter" : ""} onClick={selectCompletedHandler}>Completed</button>
       </div>
     </div>
  );
}
