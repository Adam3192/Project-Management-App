import {
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
import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import { add, trash } from 'ionicons/icons'
import { Dialog } from '@capacitor/dialog'
import { useAxios } from '../hooks/useAxios'

const Home: React.FC = () => {
  const { taskList, createTask, destroyTask, updateTask } = useAxios()
  
  const ref = useCallback((swipe: any) => {
    if (swipe) {
      swipe.closeOpened()
    }
  }, [])

  useEffect(() => {
    async function getTasks() {
      await getAllTasks()
    }

    getTasks()
  }, [])

  const [allTasks, setAllTasks] = React.useState([])

  async function getAllTasks() {
    return taskList().then((response: any) => {
      setAllTasks(response.data)
    })
  }

  async function addTask(title: string) {
    return createTask(title).then(getAllTasks);
  }

  async function deleteTask(id: string) {
    return destroyTask(id).then(getAllTasks);
  }

  async function editTask(completed: boolean, id: string) {
    return updateTask(completed, id).then(getAllTasks);
  }

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
