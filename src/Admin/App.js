import { Route, Routes } from 'react-router-dom';
import './App.css'
import MainDash from './components/MainDash/MainDash';
import Sidebar from './components/Sidebar';
import Landlord from './components/Landlord/Landlord'
import Shelter from './components/Shelter/Shelter'
import User from './components/User/User'


function App() {
  return (
    <div className="AdminApp">
      <div className="AdminAppGlass">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainDash />}/>
          <Route path="/landlord" element={<Landlord />}/>
          <Route path="/user" element={<User />}/>
          <Route path="/shelter" element={<Shelter />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
