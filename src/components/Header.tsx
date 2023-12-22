import React from "react";
import {Link} from "react-router-dom";
import "../style/HeaderStyle.css";

const Header = (): React.JSX.Element => {
    return (
        <div className="header">
            <Link to={`/product_frontend`} className="mb-5 mt-2 display-6 text-dark" style={{textDecoration: "none"}}>
                Product
            </Link>
        </div>
    );
};

export default Header;
