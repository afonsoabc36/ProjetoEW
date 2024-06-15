import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";

const Select = ({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
  className,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const baseStyles =
    "w-full py-2 bg-dark text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ease-in-out";
  const variantStyles = {
    default: "border-b-2 border-gray-300 focus:border-primary",
    error: "border-b-2 border-red-500 focus:border-red-500",
  };
  const combinedClassNames = classNames(
    baseStyles,
    error ? variantStyles.error : variantStyles.default,
    className
  );

  return (
    <div className="mb-6 relative">
      <select
        id={id}
        value={value || ""}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={combinedClassNames}
        {...props}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
};

export default Select;
