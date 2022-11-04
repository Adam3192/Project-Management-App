import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonFooter,
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
import { Dialog } from '@capacitor/dialog';

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

  async function addTask(title:string) {

    let task = { title }
    return axios
      .post(baseUrl, task)
      .then((response) => {
        getAllTasks()
        return new Promise((resolve) => resolve(response.data))
      })
  }

  const showPrompt = async (title: string, message: string, inputText: string) => {
    const { value } = await Dialog.prompt({
        title,
        message,
        inputText
    });

    return value;
};

const prompt = async () => {
  showPrompt('Task Title', 'Task Title', 'Enter Task').then(title => {
      addTask(title);
      console.log(title);
  });
}

  const displayTasks = () => {
    return allTasks.map((task: any) => {
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
      <IonFooter className='ion-padding'>
          <IonButton onClick={prompt} className='ion-float-right'>
            <IonIcon slot="icon-only" icon={add}></IonIcon>
          </IonButton>
      </IonFooter>
    </IonPage>
  )
}

export default Home
