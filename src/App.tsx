import { Route, Routes } from 'react-router-dom'
//import "./App.css"
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { LoginForm } from './components/LoginForm/LoginForm'
import { RegisterForm } from './components/RegisterForm/RegisterForm'
import { Offer } from './pages/Offer/Offer'
import { LoginContextProvider } from './contexts/LoginContext/LoginContextProvider'

export function App() {
  return (
    <>
      <LoginContextProvider>
        <Header />
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/offer/:id' element={<Offer />} />
        </Routes>
        <Footer />
      </LoginContextProvider>
    </>
  )
}