import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to={`/products`} className="mb-5 mt-2">
      {" "}
      <b style={{fontSize: '25px', textDecoration: 'none'}}>Product</b>
      {" "}
    </Link>
  );
};

export default Header;
