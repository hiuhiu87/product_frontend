import React from "react";
import "../style/LoadingStyle.css";

const LoadingSpinner = (): React.JSX.Element => {

    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default LoadingSpinner;