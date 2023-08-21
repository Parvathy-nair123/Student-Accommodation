import React, { useState } from "react";
import "./Sidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  const navigate= useNavigate();

  const logoutAdmin = ()=>{
    sessionStorage.removeItem('aid');
    navigate("/");
  }
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <span>
            <span>She</span>lter
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <Link to={item.path}  className={selected === index ? "menuItem active" : "menuItem"} key={index}
              onClick={() => setSelected(index)}>
               
                  <item.icon />

                  <span>{item.heading}</span>

              </Link>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem" onClick={logoutAdmin}>
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
