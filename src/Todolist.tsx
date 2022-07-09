import React from "react";
import {FilterValueType} from "./App";

export type TasksType = {
  id: number
  isDone: boolean
  title: string
}

export type PropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (id: number)=> void
  changeTask: (value: FilterValueType)=> void
}


export function Todolist(props: PropsType) {
  return (
     <div>

       <h3>{props.title}</h3>

       <div>
         <input/>
         <button>+</button>
       </div>

       <ul>
       {props.tasks.map(t=>
          <li>
            <button onClick={()=>{props.removeTask(t.id)}}>x</button>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
          </li>
       )}
       </ul>
       <div>
         <button onClick={()=>{props.changeTask("all")}}>All</button>
         <button onClick={()=>{props.changeTask("active")}}>Active</button>
         <button onClick={()=>{props.changeTask("completed")}}>Completed</button>
       </div>
     </div>
  );
}
