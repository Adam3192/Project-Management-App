import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Home.css'
import TaskContext from '../contexts/TaskContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import { add } from 'ionicons/icons'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {

  useEffect(() => {
    async function getTasks() {
      await getAllTasks()
    }

    getTasks()
  }, [])

  const [allTasks, setAllTasks] = React.useState([])
  const baseUrl = 'http://localhost:3000/tasks'

  async function getAllTasks() {
    return axios.get(baseUrl).then((response: any) => {
      setAllTasks(response.data)
    })
  }

  const displayTasks = () => {
    return allTasks.map((task:any) => {
      return (
        <IonItem key={task._id}>
          <IonLabel>{task.title}</IonLabel>
          <IonCheckbox></IonCheckbox>
        </IonItem>
      )
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonList>
          <IonListHeader>
            <IonLabel>Tasks</IonLabel>
          </IonListHeader>
          {displayTasks()}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Home
