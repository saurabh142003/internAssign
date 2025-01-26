import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import SideBar from './components/Sidebar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Students from './pages/Students'
import PrivateComponent from './components/PrivateComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      {/* <Route path='/' element={<Students/>} /> */}
      <Route element={<PrivateComponent/>}>
          <Route path='/' element={<Students/>}/>
      </Route>
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
