import { Link, useNavigate } from "react-router-dom";
import "../../../Common/Style/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    sessionStorage.removeItem("uid");
    navigate("/");
  };

  const userhome = () =>{
    navigate("/User");
  };
  const usercommunity = () =>{
    navigate("/Community");
  };

  const userfavorite = () =>{
    navigate("/User/Favourite");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">STUDENT-SHELTER</span>
        <div className="navItems">
          <button className="navButton" onClick={userhome}>Home
           
          </button>
          <button className="navButton"onClick={usercommunity}>
           Community
          </button>
          <button className="navButton"onClick={userfavorite}>
            Favorite
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
