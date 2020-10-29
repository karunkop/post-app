import React from "react";
import { Link } from "react-router-dom";
import classname from 'classnames';

import "./Sidebar.scss";

const Sidebar:React.FC<{}> = ({ children }) => {
  return (
    <aside id="sidebar">
      <h1>Test App</h1>
      <div id="sidebar_menu">
        {children}
      </div>
    </aside>
  );
};

export const MenuItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  link: string;
  isActive: boolean;
}> = ({ icon, title, link, isActive }) => {
  return (
    <Link to={link}>
      <div className={classname({
        "menu_item": true,
        "isActive": isActive
      })}>
        <div className="icon_div">{icon}</div>
        <div className="title">{title}</div>
      </div>
    </Link>
  );
};

export default Sidebar;
