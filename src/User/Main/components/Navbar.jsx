import { Link, useNavigate } from "react-router-dom";
import "../../../Common/Style/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    sessionStorage.removeItem("uid");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">STUDENT-SHELTER</span>
        <div className="navItems">
          <button className="navButton">
            <Link to={"/User"}>Home</Link>
          </button>
          <button className="navButton">
            <Link to={"/Community"}>Community</Link>
          </button>
          <button className="navButton">
            <Link to={"/User/Favourite"}>Favourite</Link>
          </button>
          <button className="navButton" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
