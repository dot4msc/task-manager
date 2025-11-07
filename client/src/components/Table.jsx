import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import "./Table.css"
import EditTaskForm from './modals/EditTaskForm';
export default function Table({data}) {
  const [tasks, setTasks] = useState(data);
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = useMemo(() => [
    { header: '#', cell: info => info.row.index + 1},
    { header: 'Estatus', accessorFn: row => row.status.percentage},
    { header: 'Descripción', accessorKey: 'description'},
    { header: 'Asignación', accessorKey: 'asignee'},
  ])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  function handleRowClick(row) {
    setSelectedTask(row.original);
  }

  function handleSave(updatedTask) {
    setTasks((prev) => prev.map((t) => (t.id == updatedTask.id ? updatedTask : t)))
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
    </>
  )
}