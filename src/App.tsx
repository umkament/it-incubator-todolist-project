import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

let tasks1 = [
  {id: 1, isDone: false, title: "HTML&CSS"},
  {id: 2, isDone: false, title: "JS"},
  {id: 3, isDone: true, title: "React"}
]

let tasks2 = [
  {id: 1, isDone: true, title: "interstellar"},
  {id: 2, isDone: false, title: "terminator"},
  {id: 3, isDone: false, title: "god not dead"}
]

export function App() {
    return (
        <div className="App">
            <div>
               <Todolist title="What to learn" tasks={tasks1}/>
               <Todolist title="What to show" tasks={tasks2}/>
            </div>
        </div>
    );
}


