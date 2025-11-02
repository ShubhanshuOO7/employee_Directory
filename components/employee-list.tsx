import EmployeeCard from "./employee-card"
import type { Employee } from "../types/employee"

interface EmployeeListProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (id: number) => void
}

export default function EmployeeList({ employees, onEdit, onDelete }: EmployeeListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
