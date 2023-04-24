import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  // let [tasks, setTasks] = useState<Array<TaskType>>([
  //   { id: v1(), title: 'css', isDone: true },
  //   { id: v1(), title: 'js', isDone: true },
  //   { id: v1(), title: 'react', isDone: false }
  // ])

  // let [filter, setFilter] = useState<FilterValuesType>('all')

  function removeTask(id: string, todolistId:string) {
    let tasks = tasksObj[todolistId]
    let filtredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todolistId] =filtredTasks
    setTasks({...tasksObj})
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]
    let newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj})
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId:string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find((t) => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasksObj})
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id ===todolistId);
    if(todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();



  let [todolists, setTodolists] =useState<Array<TodolistType>>( [
    { id: todolistId1, title: 'what to learn', filter: 'active' },
    { id: todolistId2, title: 'what to buy', filter: 'completed' }
  ])

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter( tl => tl.id !== todolistId)
    setTodolists(filteredTodolist)
    delete tasksObj[todolistId];
    setTasks(tasksObj)
  }

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: 'css', isDone: true },
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'react', isDone: false },
      { id: v1(), title: 'redux', isDone: false }],
    [todolistId2]: [
      { id: v1(), title: 'book', isDone: true },
      { id: v1(), title: 'milk', isDone: true },]
  })

  return (
    <div className="App">
      {
        todolists.map((tl) => {
          let tasksForTodolist = tasksObj[tl.id]

          if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
          }
          if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
          }
            return <Todolist title={tl.title} key={tl.id}
              id={tl.id}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={tl.filter}
              removeTodolist={removeTodolist} />
          })
      }
    </div>
  );
}


export default App;
