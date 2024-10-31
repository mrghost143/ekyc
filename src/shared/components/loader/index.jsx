import React from 'react';
import "./loader.scss";

export const Loader = (prop) => {
    const { size, btnLoader = false } = prop;

    const iconSize = {
        sm: "20",
        md: "30",
        lg: "40px",
        undefined: "25px"
    }

    if (btnLoader) {
        return <span className="spinner" style={{ width: iconSize[size] }} >
        </span>
    }
    return (
        <div className="loader-container">
            <div className="loader spinner" style={{ width: iconSize[size] }} >
            </div>
        </div>

    )
}
