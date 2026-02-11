
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
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import useAuthState from './hooks/useAuthState'
import { UserProvider, useUser } from './contexts/UserContext'


function App() {

  const location = useLocation()

  useAuthState()
  const user = useUser()


  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className='bg-background w-full min-h-screen flex justify-center md:w-screen md:h-screen py-5 px-4 md:px-8'>
        <div className='flex flex-col md:h-full w-full max-w-5xl'>
          {location.pathname !== '/login' && <Usuario />}
          {location.pathname !== '/login' && < Nav />}
          <ProjetosProvider>
            <TarefasProvider>
              <Routes >
                {user === null &&
                  <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Login />} />
                  </>
                }
                {user !== null &&
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path='/projetos' element={<Projetos />} />
                    <Route path='/projetos-completados' element={<ProjetosCompletados />} />
                    <Route path='/tarefas-completadas' element={<TarefasCompletadas />} />
                  </>
                }
              </Routes >
            </TarefasProvider>
          </ProjetosProvider>
        </div>
      </div >
    </>
  )
}


export default App