import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import Admin from './Admin/App'
import User from './User/App'
import Guest from './Guest/App'
import Landlord from './Landlord/App'
import Community from './User/Community/App'

export default function App() {
  return (
    <Routes>
      <Route path="/Admin/*" element={<Admin />} />
      <Route path="/User/*" element={<User />} />
      <Route path="/Landlord/*" element={<Landlord />} />
      <Route path="/*" element={<Guest />} />
      <Route path="/Community/*" element={<Community />} />
    </Routes>
  )
}
