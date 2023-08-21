import { faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../Common/Style/header.css";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useLocation, useNavigate } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const headerSearchStyle =
    location.pathname === "/User" ? { display: "flex" } : { display: "none" };

  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (destination != "") {
      navigate("/User/Search", { state: { destination } });
    }
  };
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList"></div>

        <h1 className="headerTitle">Unlock the door to your perfect stay</h1>
        <p className="headerDesc">
          Find your perfect Home, and create lifelong memories
        </p>
      </div>
      <div className="headerSearch" style={headerSearchStyle}>
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faBed} className="headerIcon" />
          <input
            type="text"
            placeholder="Search Your Location"
            className="headerSearchInput"
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
