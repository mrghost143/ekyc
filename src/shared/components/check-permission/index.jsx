import React, { useCallback } from 'react';
import "./check-permission.scss";

export const CheckPermission = ({ label, setIsChecked, isChecked }) => {

    // Memoize the click handler to avoid re-creating the function on every render
    const checkClick = useCallback(({ target: { checked } }) => {
        setIsChecked(checked);
    }, [setIsChecked]);

    return (
        <div className="checkbox-container mb-7">
            <input
                type="checkbox"
                id="custom-checkbox"
                className="custom-checkbox"
                onChange={checkClick}
                checked={isChecked}
            />
            <label htmlFor="custom-checkbox" className="checkbox-label">
                {label}
            </label>
        </div>
    );
};
