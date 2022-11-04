import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TaskContext from './TaskContext'

export const TaskProvider = (props:any) => {

  // let params = useParams()

  const [allTasks, setAllTasks] = useState([])
  
  const baseUrl = 'http://localhost:3000/tasks'

  useEffect(() => {
    async function getTasks() {
      await getAllTasks()
    }

    getTasks()
  }, [])

  async function getAllTasks() {
    return axios.get(baseUrl).then((response:any) => {
      setAllTasks(response)
    })
  }

  return (

    <h1></h1>
    
    // <TaskContext.Provider
    //   value={{
    //     allTasks
    //   }}
    // >
    //   {props.children}
    // </TaskContext.Provider>
  )
}
