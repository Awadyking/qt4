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
import Register from './routes/Register.jsx'
import APP_Dialog from './components/APP_Dialog.jsx'
import Dashboard from './routes/Dashboard.jsx'
import CreateExam from './routes/CreateExam.jsx'
import Loading from './components/Loading.jsx'
import UploadExam from './routes/UploadExam.jsx'
import JoinExam from './routes/JoinExam.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={MainStore} >
    <BrowserRouter>
      <Header />
      <Main>

              <Routes>
                    <Route path='/' element={<App/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path='/register' element={<Register/>} ></Route>
                    <Route path="/dashboard" element={<Dashboard/>} ></Route>
                    <Route path="/create-exam" element={<CreateExam/>} ></Route>
                    <Route path="/upload-exam" element={<UploadExam/>}></Route>
                    <Route path='/join-exam' element={<JoinExam/>} ></Route>
                    <Route path="*" element={<E404/>}></Route>
              </Routes>
        </Main>
        <APP_Dialog/>
        <Loading/>
        </BrowserRouter>
      </Provider>
  </StrictMode>,
)
