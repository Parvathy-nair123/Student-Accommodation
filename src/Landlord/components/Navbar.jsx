import { Link, useNavigate } from "react-router-dom";
import "../../Common/Style/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutLandlord = () => {
    sessionStorage.removeItem("lid");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">STUDENT-SHELTER</span>
        <div className="navItems">
          <button className="navButton">
            <Link to={"/Landlord"}>Home</Link>
          </button>
          <button className="navButton">
            <Link to={"/Landlord/AddProperty"}>Add Property</Link>
          </button>
          <button className="navButton">
            <Link to={"/Landlord/ViewProperty"}>View Property</Link>
          </button>
          <button className="navButton">
            <Link to={"/Landlord/ViewRequests"}>View Requests</Link>
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
