import axios from 'axios'
const baseUrl = 'http://localhost:3000/tasks/'

async function taskList() {
  return axios.get(baseUrl)
}

async function createTask(title: string) {
  let task = { title }
  return axios.post(baseUrl, task)
}

async function destroyTask(id: string) {
  return axios.delete(baseUrl + id).catch((error) => {
    console.log(error)
  })
}

async function updateTask(completed: boolean, id: string) {
 let updatedTask = { completed }

 return axios.put(baseUrl + id, updatedTask)
}

export function useAxios() {
  return {
    taskList,
    createTask,
    destroyTask,
    updateTask
  }
}
