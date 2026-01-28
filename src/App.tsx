
import './App.css'
import { Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Projetos from './pages/Projetos'
import ProjetosCompletados from './pages/ProjetosCompletados'
import TarefasCompletadas from './pages/TarefasCompletadas'
import Nav from './components/Nav'
import Usuario from './components/Usuario'
import { ProjetosProvider } from './contexts/ProjetosContext'
import { TarefasProvider } from './contexts/TarefasContext'
import { Button } from './components/ui/button'
import { FirebaseController } from './controllers'

function App() {

  const location = useLocation()

  FirebaseController.deleteTarefa('wqdqwd')

  return (

    <div className='bg-background w-screen h-screen flex justify-center pt-5 pb-5'>
      <div className='flex flex-col max-w-5xl h-full w-full'>
        {location.pathname !== '/login' && <Usuario />}
        {location.pathname !== '/login' && < Nav />}
        <ProjetosProvider>
          <TarefasProvider>
            <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path='/projetos' element={<Projetos />} />
              <Route path='/projetos-completados' element={<ProjetosCompletados />} />
              <Route path='/tarefas-completadas' element={<TarefasCompletadas />} />
            </Routes >
          </TarefasProvider>
        </ProjetosProvider>
      </div>
    </div >
  )
}


export default App