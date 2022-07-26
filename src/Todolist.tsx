import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";

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

const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
     <div>
       <h3>{props.title} <button onClick={removeTodolistHandler}>x</button></h3>
       <AddItemForm
         addItem={addTask}
       />
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


export type EditableSpanPropsType = {

}

export function EditableSpan (props: EditableSpanPropsType) {

}

