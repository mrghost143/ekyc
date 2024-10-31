import React, { useMemo, useCallback } from 'react';
import { Loader } from '../loader';

export const Button = React.memo(({
  type = "button",
  children,
  status = "invalid",
  onClick,
  mode = "primary",
  className: rootBtnClass = "",
  ...rest
}) => {
  const isLoading = status === "loading";
  const isInvalid = status === "invalid";
  const isValid = status === "valid";
  const isDisabled = status === "disable";

  const className = useMemo(() => {
    return `btn btn-${mode} ${isValid ? "valid" : ""}${isInvalid ? "invalid" : ""}${isLoading ? "loading" : ""}${isDisabled ? "disable" : ""} ${rootBtnClass}`.trim();
  }, [isValid, isInvalid]);

  const handleClick = useCallback((event) => {
    if (!isDisabled && !isLoading && onClick) {
      onClick(event);
    }
  }, [isDisabled, isLoading, onClick]);

  return (
    <button
      type={type}
      {...rest}
      disabled={isDisabled || isLoading}
      className={className}
      onClick={handleClick}
    >
      {isLoading ? <Loader size={"sm"} btnLoader={true} /> : children}
    </button>
  );
});
