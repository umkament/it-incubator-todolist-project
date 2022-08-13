import {TaskStateType} from "../App";
import {addTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be removed from correct array', ()=>{
  const startState: TaskStateType = {
    "todolistID1":[
       {id: "1", title: "CSS", isDone: false},
       {id: "2", title: "HTML", isDone: false},
       {id: "3", title: "JS", isDone: false}
       ],
       "todolistID2":[
       {id: "1", title: "milk", isDone: false},
       {id: "2", title: "bread", isDone: false},
       {id: "3", title: "honey", isDone: false}
     ]
  }
  const action = removeTaskAC("todolistID2","2")
  const endState = tasksReducer(startState,action)

  expect(endState['todolistID1'].length).toBe(3)
  expect(endState['todolistID2'].length).toBe(2)
  expect(endState['todolistID2'].every(t=> t.id != "2")).toBeTruthy()
}
)

test('new task should be added in correct array', ()=>{
     const startState: TaskStateType = {
       "todolistID1":[
         {id: "1", title: "CSS", isDone: false},
         {id: "2", title: "HTML", isDone: false},
         {id: "3", title: "JS", isDone: false}
       ],
       "todolistID2":[
         {id: "1", title: "milk", isDone: false},
         {id: "2", title: "bread", isDone: false},
         {id: "3", title: "honey", isDone: false}
       ]
     }
     const action = addTaskAC("todolistID2", "juse")
     const endState = tasksReducer(startState,action)

     expect(endState['todolistID1'].length).toBe(3)
     expect(endState['todolistID2'].length).toBe(4)
     expect(endState['todolistID2'][0].id).toBeDefined()
     expect(endState['todolistID2'][0].title).toBe("juse")
     expect(endState['todolistID2'][0].isDone).toBe(false)
   }
)