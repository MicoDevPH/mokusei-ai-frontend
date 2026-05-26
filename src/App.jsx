import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Agents from './pages/Agents'
import AgentGanymede from './pages/AgentGanymede'
import Pricing from './pages/Pricing'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agents/ganymede" element={<AgentGanymede />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
