import React from "react";
import "./ViewLayout.scss";

const ViewLayout: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <section id="view_layout">
      <h2 id="view_page_title">{title}</h2>
      <div id="page_wrapper">{children}</div>
    </section>
  );
};

export default ViewLayout;
