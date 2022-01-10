import React from "react";

import Header from "./header/header";
import Footer from "./footer/footer";

const Layout = ({ children }) => {
  return (
    <main>
      <Header></Header>
      {children}
      <Footer></Footer>
    </main>
  );
};
export default Layout;
