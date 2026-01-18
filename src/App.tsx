
import './App.css'
import { Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Projetos from './pages/Projetos'
import ProjetosCompletados from './pages/ProjetosCompletados'
import TarefasCompletadas from './pages/TarefasCompletadas'
import Nav from './components/Nav'
import Usuario from './components/Usuario'


function App() {

  const location = useLocation()

  return (

    <div className='bg-background w-screen h-screen flex justify-center pt-5 pb-5'>
      <div className='max-w-5xl h-full w-full'>
        {location.pathname !== '/login' && <Usuario />}
        {location.pathname !== '/login' && < Nav />}
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/projetos' element={<Projetos />} />
          <Route path='/projetos-completados' element={<ProjetosCompletados />} />
          <Route path='/tarefas-completadas' element={<TarefasCompletadas />} />
        </Routes >
      </div>
    </div >
  )
}


export default App
