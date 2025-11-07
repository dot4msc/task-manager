import "./App.css"
import Button from "./components/Button"
import NewTaskForm from "./components/modals/NewTaskForm"
import Table from "./components/Table"
import { useState } from "react"

export default function App() {
  const dummyData = [
    {
      description: 'Instalar solar wing',
      status: {
        percentage: 0,
        label: 'EN PROCESO'
      },
      asignee: 'Vicente',
    },
    {
      description: 'Conectar plogas',
      status: {
        percentage: 50,
        label: 'EN PROCESO'
      },
      asignee: 'Mariano'
    },
    {
      description: 'Instalar Faros 9\"',
      status: {
        percentage: 100,
        label: 'COMPLETADO'
      },
      asignee: 'Adolfo'
    }
  ]
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(dummyData);

  function onAddTask(task){
    console.log("added dummy")
    console.log(task);
    setData(dummyData => [...dummyData, task])
  }

  return(
    <>
      <Table data={data}/>
      <Button text="+ Agregar Tarea" fn={() => setShowModal(true)}/>
      {showModal && (
        <NewTaskForm setShowModal={setShowModal} onAddTask={onAddTask}/>
      )}
    </>
  )
}