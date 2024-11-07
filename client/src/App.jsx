

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home  from './pages/Home'
import { About } from './pages/About'
import { Profile } from './pages/Profile'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Header } from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateBicycle from './pages/createBicycle'
import UpdateListing from './pages/updateListing'
import BicyclePage from './pages/BicyclePage'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/bicycle/:bicycleId' element={<BicyclePage/>} />
        <Route path='/search' element={<SearchPage/>} />
        <Route element={<PrivateRoute/>}>
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/create-bicycle' element={<CreateBicycle/>}/>
         <Route path='/update-bicycle/:bicycleId' element={<UpdateListing/>}/>
        </Route>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}
