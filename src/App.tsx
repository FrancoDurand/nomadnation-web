import { Route, Routes } from 'react-router-dom'
import "./App.css"
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home'
import { LoginForm } from './components/LoginForm/LoginForm'
import { RegisterForm } from './components/RegisterForm/RegisterForm'

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
      <Footer />
    </>
  )
}