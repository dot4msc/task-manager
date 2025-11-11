import "./App.css"
import Button from "./components/Button"
import ErrorAlert from "./components/errors/ErrorAlert"
import NewTaskForm from "./components/modals/NewTaskForm"
import Table from "./components/Table"
import { useEffect, useState } from "react"

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL)
      .then((res) => {
        if(!res.ok){
          setIsError(true);
          setErrorMessage(`Error (${res.status}): ${res.statusText}`)
        }
        return res.json()
      }
      )
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(`Error (${error.name}): ${error.message}`);
        setLoading(false)
      })
  },[])

  function onAddTask(task){

    fetch(import.meta.env.VITE_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(res=>{
        if(!res.ok){
          setIsError(true);
          setErrorMessage(`Error (${res.status}): ${res.statusText}`)
        }
        return res.json()
      })
      .then((data) => {
        setData(apiData => [...apiData, data])
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(`Error (${error.name}): ${error.message}`);
      })
  }

  function onDelete(info){
    fetch(`${import.meta.env.VITE_SERVER_URL}/${info.row.original._id}`,{
      method: 'DELETE'
    })
    .then(res => {
      if(!res.ok) {
        setIsError(true);
        setErrorMessage(`Error (${res.status}): ${res.statusText}`)
      }
      setData(prev => prev.filter(element => element._id !== info.row.original._id))
    })
    .catch((error) => {
      setIsError(true);
      setErrorMessage(`Error (${error.name}): ${error.message}`);
    })
    
  }

  function onEditTask(updatedTask) {

    setData((prev) => prev.map((t) => {
      if(t._id == updatedTask._id) {
        return updatedTask;
      }
      else {
        return t
      }
    }))

    fetch(`${import.meta.env.VITE_SERVER_URL}/${updatedTask._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask),
    })
      .then(res => {
        if(!res.ok) {
          setIsError(true);
          setErrorMessage(`Error (${res.status}): ${res.statusText}`)
        }
        return res.json()
      })
      .then(data => console.log("Got data: ", data))
      .catch(error => {
        setIsError(true);
        setErrorMessage(`Error (${error.name}): ${error.message}`);
      });

  }

  if (loading) return <p>Loading...</p>;
  
  return(
    <>
      <Table data={data} onDelete={onDelete} onSave={onEditTask}/>
      <Button text="+ Agregar Tarea" fn={() => setShowModal(true)}/>
      {showModal && (
        <NewTaskForm setShowModal={setShowModal} onAddTask={onAddTask}/>
      )}
      {isError && (
        <ErrorAlert onClick={() => setIsError(false)}>{errorMessage}</ErrorAlert>
      )}
    </>
  )
}