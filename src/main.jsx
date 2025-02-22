import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Routes , Route , BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx'
import { Main } from './components/Main.jsx'
import {Provider} from "react-redux"
import { MainStore } from './redux/Store.js'
import E404 from './routes/E404.jsx'
import Login from './routes/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={MainStore} >
    <BrowserRouter>
      <Header />
      <Main>
              <Routes>
                    <Route path='/' element={<App/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="*" element={<E404/>}></Route>
              </Routes>
        </Main>
        </BrowserRouter>
      </Provider>
  </StrictMode>,
)
