import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Input = ({
  id,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  className,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const baseStyles =
    "w-full py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ease-in-out";
  const variantStyles = {
    default: "border-b-2 border-gray-300 focus:border-primary",
    error: "border-b-2 border-red-500 focus:border-red-500",
  };
  const combinedClassNames = classNames(
    baseStyles,
    error ? variantStyles.error : variantStyles.default,
    className
  );

  const underlineWidth = Math.max(100, value?.length * 10);

  return (
    <div className="mb-6 relative">
      {label && (
        <label htmlFor={id} className="block text-lg mb-2 text-white">
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={isFocused ? "" : placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${combinedClassNames} h-32`}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={isFocused ? "" : placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={combinedClassNames}
          {...props}
        />
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
