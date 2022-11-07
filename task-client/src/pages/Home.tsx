import {
  IonAvatar,
  IonButton,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import './Home.css'
import TaskContext from '../contexts/TaskContext'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import { add, trash } from 'ionicons/icons'
import { Link } from 'react-router-dom'
import { Dialog } from '@capacitor/dialog'

const Home: React.FC = () => {
  useEffect(() => {
    async function getTasks() {
      await getAllTasks()
    }

    getTasks()
  }, [])

  const [allTasks, setAllTasks] = React.useState([])
  const baseUrl = 'http://localhost:3000/tasks/'

  async function getAllTasks() {
    return axios.get(baseUrl).then((response: any) => {
      setAllTasks(response.data)
    })
  }

  async function addTask(title: string) {
    let task = { title }
    return axios.post(baseUrl, task).then((response) => {
      getAllTasks()
      return new Promise((resolve) => resolve(response.data))
    })
  }

  function deleteTask(id: string) {
    axios
      .delete(baseUrl + id)
      .then(() => {
        getAllTasks()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function editTask(completed: boolean, id: string) {
    let updatedTask = { completed }

    return axios.put(baseUrl + id, updatedTask).then((response) => {
      getAllTasks()
      return new Promise((resolve) => resolve(response.data))
    })
  }

  const ref = useCallback((swipe: any) => {
    if (swipe) {
      swipe.closeOpened()
    }
  }, [])

  const showPrompt = async (
    title: string,
    message: string,
    inputText: string
  ) => {
    const { value } = await Dialog.prompt({
      title,
      message,
      inputText,
    })

    return value
  }

  const prompt = async () => {
    showPrompt('Task Title', 'Task Title', 'Enter Task').then((title) => {
      addTask(title)
      console.log(title)
    })
  }

  function completedTasks() {
    return allTasks
      .filter((task: any) => {
        if (task.completed) {
          return task
        }
      })
      .map((task: any) => {
        return (
          <IonItemSliding ref={ref}>
            <IonItem
              onClick={
                task.completed
                  ? () => editTask(false, task._id)
                  : () => editTask(true, task._id)
              }
              key={task._id}
            >
              <IonLabel>{task.title}</IonLabel>
              <IonCheckbox checked={task.completed} />
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption color="danger">
                <IonIcon
                  onClick={() => deleteTask(task._id)}
                  slot="icon-only"
                  icon={trash}
                ></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        )
      })
  }

  function incompleteTasks() {
    return allTasks
      .filter((task: any) => {
        if (!task.completed) {
          return task
        }
      })
      .map((task: any) => {
        return (
          <IonItemSliding ref={ref}>
            <IonItem
              onClick={
                task.completed
                  ? () => editTask(false, task._id)
                  : () => editTask(true, task._id)
              }
              key={task._id}
            >
              <IonLabel>{task.title}</IonLabel>
              <IonCheckbox checked={task.completed} />
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption
                onClick={() => deleteTask(task._id)}
                color="danger"
              >
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        )
      })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Task List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader color="secondary">
            <IonLabel>Incomplete</IonLabel>
          </IonListHeader>
          {incompleteTasks()}
        </IonList>
        <IonList className="ion-padding-top">
          <IonListHeader color="secondary">
            <IonLabel>Complete</IonLabel>
          </IonListHeader>
          {completedTasks()}
        </IonList>
      </IonContent>
      <IonFooter className="ion-padding">
          <IonButton onClick={prompt} className="ion-float-right">
            <IonIcon slot="icon-only" icon={add}></IonIcon>
          </IonButton>
      </IonFooter>
    </IonPage>
  )
}

export default Home
