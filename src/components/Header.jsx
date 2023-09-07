import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to={`/product_frontend`} className="mb-5 mt-2 display-6 text-dark" style={{textDecoration: "none"}}>
      Product
    </Link>
  );
};

export default Header;
