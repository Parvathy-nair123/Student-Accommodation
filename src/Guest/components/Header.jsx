import { faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Common/Style/header.css";
import Login from "../pages/Login";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css";
import { useState } from "react";

const Header = ({ type }) => {
  const [loginModel, setLoginModel] = useState(false);
  const loginOpen = () => {
    setLoginModel(true);
  };

  const loginClose = () => {
    setLoginModel(false);
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList"></div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Unlock the door to your perfect stay
            </h1>
            <p className="headerDesc">
              Find your perfect Home, and create lifelong memories
            </p>
            <button className="headerBtn1" onClick={loginOpen}>Sign in / Register</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Enter Your Location"
                  className="headerSearchInput"
                />
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={loginOpen}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
        <Login isOpen={loginModel} onClose={loginClose} />
      </div>
    </div>
  );
};

export default Header;
