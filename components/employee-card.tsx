import { Mail, Phone, Edit2, Trash2 } from "lucide-react"
import type { Employee } from "../types/employee"

interface EmployeeCardProps {
  employee: Employee
  onEdit: (employee: Employee) => void
  onDelete: (id: number) => void
}

export default function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-all hover:shadow-lg hover:shadow-black/30">
      {/* Header with Avatar */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900/30">
            <span className="text-lg font-semibold text-blue-400">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-100">{employee.name}</h3>
            <p className="text-sm text-blue-400">{employee.role}</p>
          </div>
        </div>
      </div>

      {/* Department Badge */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300 border border-gray-700">
          {employee.department}
        </span>
      </div>

      {/* Contact Info */}
      <div className="mb-4 space-y-2 border-t border-gray-800 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Mail className="h-4 w-4 text-gray-500" />
          <a href={`mailto:${employee.email}`} className="hover:text-blue-400 transition-colors">
            {employee.email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Phone className="h-4 w-4 text-gray-500" />
          <a href={`tel:${employee.phone}`} className="hover:text-blue-400 transition-colors">
            {employee.phone}
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-gray-800 pt-4">
        <button
          onClick={() => onEdit(employee)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-800 py-2 font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white active:bg-gray-600"
        >
          <Edit2 className="h-4 w-4" />
          <span className="hidden sm:inline">Edit</span>
        </button>
        <button
          onClick={() => {
            if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
              onDelete(employee.id)
            }
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-800 py-2 font-medium text-red-400 transition-colors hover:bg-gray-700 hover:text-red-300 active:bg-gray-600"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  )
}
