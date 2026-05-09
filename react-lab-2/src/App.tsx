import { Routes, Route, Navigate } from 'react-router'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  return !isLoggedIn ? <>{children}</> : <Navigate to="/todos" replace />
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
