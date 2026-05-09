import { useState } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

interface Todo {
  id: string
  text: string
}

export default function TodoPage() {
  const { name, logout } = useAuth()
  const navigate = useNavigate()
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  function handleAdd() {
    const trimmed = input.trim()
    if (!trimmed) {
      toast.error('Please enter a task')
      return
    }
    setTodos((prev) => [...prev, { id: uuidv4(), text: trimmed }])
    setInput('')
    toast.success('Task added!')
  }

  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
    toast('Task deleted')
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
      <div className="bg-[#3d3a34] rounded-2xl p-8 w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-white text-2xl font-bold">Welcome, {name}!</h1>
          <button
            onClick={handleLogout}
            className="bg-[#1c1c1c] text-white px-4 py-2 rounded-lg hover:bg-black transition-colors cursor-pointer text-sm"
          >
            Log out
          </button>
        </div>

        <p className="text-white/70 text-sm mb-6">
          Have a great and productive day!
        </p>

        {/* Todo list */}
        <div className="flex flex-col gap-2 mb-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between bg-[#4a4640] rounded-lg px-4 py-3"
            >
              <span className="text-white">{todo.text}</span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Add task input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="New task..."
            className="flex-1 bg-[#2a2825] text-white rounded-lg px-4 py-2 outline-none border border-transparent focus:border-white/30"
          />
          <button
            onClick={handleAdd}
            className="bg-[#1c1c1c] text-white px-5 py-2 rounded-lg hover:bg-black transition-colors cursor-pointer whitespace-nowrap"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  )
}
