import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

export type TasksType = {
  id: string
  isDone: boolean
  title: string
}

export type PropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (id: string)=> void
  changeTask: (value: FilterValueType)=> void
  addTask: (title: string)=>void
}

export function Todolist(props: PropsType) {

  const [taskTitle, setTaskTitle] = useState("")

  const taskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }
  const taskTitleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(taskTitle);
      setTaskTitle((""))
    }
  }
  const addTaskButtonClickHandler = () => {
    props.addTask(taskTitle);
    setTaskTitle("")
  }
  const selectAllHandler = () => {
    props.changeTask("all")
  }
  const selectCompletedHandler = () => {
    props.changeTask("completed")
  }
  const selectActiveHandler = () => {
    props.changeTask("active")
  }


  return (
     <div>
       <h3>{props.title}</h3>
       <div>
         <input
            value={taskTitle}
            onChange={taskTitleChangeHandler}
            onKeyPress={taskTitleKeyPressHandler}
         />
         <button onClick={addTaskButtonClickHandler}>+</button>
       </div>
       <ul>
         {props.tasks.map(t => {

           const removeTaskHandler = () => {
             props.removeTask(t.id)
           }

           return <li key={t.id}>
             <button onClick={removeTaskHandler}>x</button>
             <input type="checkbox" checked={t.isDone}/>
             <span>{t.title}</span>
           </li>
         })}
       </ul>
       <div>
         <button onClick={selectAllHandler}>All</button>
         <button onClick={selectActiveHandler}>Active</button>
         <button onClick={selectCompletedHandler}>Completed</button>
       </div>
     </div>
  );
}
