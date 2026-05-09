import { useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [name, setName] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleLogin() {
    const trimmed = name.trim()
    if (!trimmed) {
      toast.error('Please enter your name')
      return
    }
    login(trimmed)
    toast.success(`Welcome, ${trimmed}!`)
    navigate('/todos')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
      <div className="bg-[#3d3a34] rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-white text-2xl font-bold mb-6">
          Hi. What's your name?
        </h1>
        <div className="flex gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your name"
            className="flex-1 bg-[#2a2825] text-white rounded-lg px-4 py-2 outline-none border border-transparent focus:border-white/30"
            autoFocus
          />
          <button
            onClick={handleLogin}
            className="bg-[#1c1c1c] text-white px-5 py-2 rounded-lg hover:bg-black transition-colors cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
