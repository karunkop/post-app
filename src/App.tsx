import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import { AccountBookOutlined, ApiOutlined } from "@ant-design/icons";
import Sidebar, { MenuItem } from "./components/Sidebar/Sibebar";
import PostPage from "./views/PostPage/PostPage";
import CategoryPage from "./views/CategoryPage/CategoryPage";

import "./App.scss";

const menuItems = [
  {
    title: "Post",
    link: "/post",
    icon: <AccountBookOutlined />,
  },
  {
    title: "Category",
    link: "/category",
    icon: <ApiOutlined />,
  },
];

const App = () => {
  const location = useLocation();

  console.log(location);

  return (
    <div className="main_app">
      <div className="sidebar_wrapper">
        <Sidebar>
          {menuItems.map(({ title, link, icon }) => (
            <MenuItem
              key={title}
              title={title}
              link={link}
              icon={icon}
              isActive={location.pathname.startsWith(link)}
            />
          ))}
        </Sidebar>
      </div>
      <div className="view_section">
        <Switch>
          <Route path="/post" component={PostPage} />
          <Route path="/category" component={CategoryPage} />
          <Route path="*" component={() => <Redirect to="/post" />} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
