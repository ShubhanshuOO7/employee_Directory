import { useState } from "react"
import { X } from "lucide-react"
import type { Employee } from "../types/employee"

interface EmployeeFormProps {
  employee: Employee | null
  onSubmit: (data: Omit<Employee, "id">) => void
  onCancel: () => void
}

export default function EmployeeForm({ employee, onSubmit, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>(
    employee || {
      name: "",
      department: "",
      email: "",
      phone: "",
      role: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onCancel}
          aria-hidden="true"
        />
        
        {/* Form Container */}
        <div className="relative w-full max-w-2xl rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-xl shadow-slate-900/20">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-100">{employee ? "Edit Employee" : "Add New Employee"}</h2>
        <button 
          onClick={onCancel} 
          className="rounded-full p-1 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors"
          aria-label="Close form"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50 focus:outline-none"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-300">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50 focus:outline-none"
              required
            >
              <option value="">Select a department</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-700 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 font-medium text-slate-200 hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
          >
            {employee ? "Update" : "Add"} Employee
          </button>
        </div>
      </form>
        </div>
      </div>
    </div>
  )
}
