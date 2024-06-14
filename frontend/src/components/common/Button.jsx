import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  type = "button",
  className,
  variant = "primary",
  size = "md",
  disabled = false,
}) => {
  const baseStyles =
    "font-semibold rounded focus:outline-none focus:ring transition duration-200 ease-in-out";
  const variantStyles = {
    primary:
      "bg-primary border-2 border-transparent text-black hover:bg-dark hover:text-primary hover:border-primary hover:border-2",
    nobg: "text-white hover:text-primary",
    danger:
      "bg-red-700 border-2 border-transparent text-white hover:bg-dark hover:border-red-500 hover:border-2",
    warning:
      "bg-yellow-500 border-2 border-transparent text-black hover:bg-dark hover:text-yellow-500 hover:border-yellow-500 hover:border-2",
  };
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-[0.4rem] text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const combinedClassNames = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
    { [disabledStyles]: disabled }
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassNames}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "nobg", "danger", "warning"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
};

export default Button;
