
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Adminhome from './pages/Adminhome'
import Userhome from './pages/Userhome'
import Home from './pages/Home'
import Login from './pages/Login'
import UserRegister from './pages/UserRegister'
import ServiceRegister from './pages/ServiceRegister'
import Servicehome from './pages/Servicehome'
import ServiceLogin from './pages/ServiceLogin'
import Registration from './pages/Registration'
import ViewDetails from './pages/ViewDetails'
import Admin from './pages/Admin'
import Adminservice from './pages/Adminservice'
import LoginAdmin from './pages/LoginAdmin'
import AdminProtector from './Protection/AdminProtector'
import UserProtector from './Protection/UserProtector'
import ServiceProtector from './Protection/ServiceProtector'



function App() {

 
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/adminhome' element={<AdminProtector><Adminhome/></AdminProtector>}/>
        <Route path='/userhome' element={<UserProtector><Userhome/></UserProtector>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user-register' element={<UserRegister/>}/>
        <Route path='/service-register' element={<ServiceRegister/>}/>
        <Route path='/servicehome' element={<ServiceProtector><Servicehome/></ServiceProtector>}/>
        <Route path='/servicelogin' element={<ServiceLogin/>}/>
        <Route path='/registration' element={<ServiceProtector><Registration/></ServiceProtector>}/>
        <Route path='/viewdetails' element={<UserProtector><ViewDetails/></UserProtector>}/>
        <Route path='/admin' element={<AdminProtector><Admin/></AdminProtector>}/>
        <Route path='/adminservice' element={<AdminProtector><Adminservice/></AdminProtector>}/>
        <Route path='/adminlogin' element={<LoginAdmin/>}/>
      </Routes>
    </>
    
  )
}

export default App