import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import {Login} from './components/Auth/Login'
import { Register } from './components/Auth/Register'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1> Hello</h1>
        
        <Register/>
      </div>
    </>
  )
}

export default App
