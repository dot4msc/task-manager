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
        label: 'En Proceso'
      },
      asignee: 'Vicente',
    },
    {
      description: 'Conectar plogas',
      status: {
        percentage: 50,
        label: 'En proceso'
      },
      asignee: 'Mariano'
    },
    {
      description: 'Instalar Faros 9\"',
      status: {
        percentage: 100,
        label: 'Completado'
      },
      asignee: 'Adolfo'
    }
  ]

  const [data, setData] = useState(dummyData);
  console.log(data)
  function addTask(){
    const newData = {
      description: 'Hello test',
      status: {
        percentage: 0,
        label: 'En Proceso'
      },
      asignee: 'Johan'
    }
    console.log("added dummy")
    setData(dummyData => [...dummyData, newData])
  }
  return(
    <>
      <Table data={data}/>
      <Button text="+ Agregar Tarea" fn={addTask}/>
      <NewTaskForm/>
    </>
  )
}