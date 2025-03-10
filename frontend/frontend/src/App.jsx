import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import Signup from './page/signup'
import Signin from './page/Signin'
import Otp from './page/otp'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={ <Signup/>} />
      <Route path='/signin' element={ <Signin/>} />
      <Route path='/otp' element={<Otp/>} />
    </Routes>
    
    </>
  )
}

export default App
