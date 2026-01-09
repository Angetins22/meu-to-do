import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Projetos from './pages/Projetos'
import ProjetosCompletados from './pages/ProjetosCompletados'
import TarefasCompletadas from './pages/TarefasCompletadas'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path='/projetos' element={<Projetos />} />
      <Route path='/projetos-completados' element={<ProjetosCompletados />} />
      <Route path='/tarefas-completadas' element={<TarefasCompletadas />} />
    </Routes>
  )
}

export default App
