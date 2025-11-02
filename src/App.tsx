import { useState, useMemo } from "react"
import SearchBar from "./components/search-bar"
import EmployeeList from "./components/employee-list"
import EmployeeForm from "./components/employee-Form"
import type { Employee } from "../types/employee"

const defaultEmployees: Employee[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Product Designer",
    department: "Design",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Frontend Engineer",
    department: "Engineering",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    department: "Product",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Backend Engineer",
    department: "Engineering",
    email: "james.wilson@company.com",
    phone: "+1 (555) 456-7890",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "UX Researcher",
    department: "Design",
    email: "lisa.anderson@company.com",
    phone: "+1 (555) 567-8901",
  },
]

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>(defaultEmployees)
  const [searchQuery, setSearchQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [employees, searchQuery])

  const handleAddEmployee = (formData: Omit<Employee, "id">) => {
    if (editingEmployee) {
      setEmployees(employees.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...formData } : emp)))
      setEditingEmployee(null)
    } else {
      const newEmployee: Employee = {
        ...formData,
        id: Math.max(0, ...employees.map((e) => e.id)) + 1,
      }
      setEmployees([...employees, newEmployee])
    }
    setShowForm(false)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setShowForm(true)
  }

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingEmployee(null)
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 transition-colors duration-200">
      <main className="min-h-[calc(100vh-3rem)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-slate-200">Employee Directory</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">Manage and search your team members</p>
          </div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              <span className="mr-2">+</span> Add Employee
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-900 dark:text-slate-200">{filteredEmployees.length}</span> of{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-200">{employees.length}</span> employees
            </p>
          </div>

          {showForm && (
            <div className="mb-8">
              <EmployeeForm employee={editingEmployee} onSubmit={handleAddEmployee} onCancel={handleCloseForm} />
            </div>
          )}

          <EmployeeList employees={filteredEmployees} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />

          {filteredEmployees.length === 0 && !showForm && (
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-12 text-center">
              <p className="text-lg text-slate-600 dark:text-slate-400">No employees found. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
