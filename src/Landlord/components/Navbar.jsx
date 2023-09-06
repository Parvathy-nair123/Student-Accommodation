import { Link, useNavigate } from "react-router-dom";
import "../../Common/Style/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutLandlord = () => {
    sessionStorage.removeItem("lid");
    navigate("/");
  };

  const lanloardhome = () =>{
    navigate("/Landlord");
  };

  const addproperty = () =>{
    navigate("/Landlord/AddProperty");
  };

  const viewproperty = () =>{
    navigate("/Landlord/ViewProperty");
  };

  const viewrequest = () =>{
    navigate("/Landlord/ViewRequests");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">STUDENT-SHELTER</span>
        <div className="navItems">
          <button className="navButton"onClick={lanloardhome}>Home
          </button>
          <button className="navButton" onClick={addproperty}>
            Add Property
          </button>
          <button className="navButton" onClick={viewproperty}>
           View Property
          </button>
          <button className="navButton" onClick={viewrequest}>
            View Requests
          </button>
          <button className="navButton" onClick={logoutLandlord}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
