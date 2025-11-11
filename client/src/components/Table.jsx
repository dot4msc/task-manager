import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import "./Table.css"
import EditTaskForm from './modals/EditTaskForm';
import DeleteButton from './DeleteButton';
import ErrorAlert from './errors/ErrorAlert';

export default function Table({data, onDelete, onSave}) {

  const [_tasks, setTasks] = useState(data);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const columns = useMemo(() => [
    { header: '#', cell: info => info.row.index + 1},
    { header: 'Estatus', accessorFn: row => row.status.percentage},
    { header: 'Descripción', accessorKey: 'description'},
    { header: 'Asignación', accessorKey: 'asignee'},
    { header: 'Borrar', cell: info => <DeleteButton onDelete={(e) => handleDelete(e,info)}/>}
  ])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  function handleDelete(e,info) {
    e.stopPropagation();
    onDelete(info);
  }

  function handleRowClick(row) {
    setSelectedTask(row.original);
  }

  function handleSave(updatedTask) {
    onSave(updatedTask)
    setSelectedTask(null)
  }

 
  return (
    <>
      <table className="task-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            
            <tr onClick={() => handleRowClick(row)} key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTask && (
        <EditTaskForm
          task={selectedTask}
          onSave={handleSave}
          onClose={() => setSelectedTask(null)}
        />
      )}
      {isError && (
        <ErrorAlert onClick={() => setIsError(false)}>{errorMessage}</ErrorAlert>
      )}
    </>
  )
}