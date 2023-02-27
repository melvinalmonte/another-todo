import { Component, JSX, ParentComponent } from "solid-js";
import Navbar from "../navbar";

interface ILayout {
  children: JSX.Element;
}
const Layout: ParentComponent = props => {
  return (
    <>
      <Navbar />
      <div>{props.children}</div>
    </>
  );
};

export default Layout;
