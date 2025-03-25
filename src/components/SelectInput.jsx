
import React, { useState } from "react";

export const SelectInput = ({
  options,
  value,
  onChange,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getSelectStyles = () => {
    const state = disabled ? "disabled" : isFocused ? "focus" : "default";

    return {
      backgroundColor: `var(--color-select-background-${state})`,
      color: `var(--color-select-text-${state})`,
      border: `var(--border-width-xs) solid var(--color-select-border-${state})`,
      borderRadius: `var(--component-select-borderRadius)`,
      padding: `var(--component-select-padding-y) var(--component-select-padding-x)`,
      fontSize: `var(--component-select-fontSize)`,
      fontFamily: `var(--typography-fontFamily-primary)`,
      cursor: disabled ? "not-allowed" : "pointer",
      outline: "none",
      transition: "all 0.2s ease-in-out",
    };
  };

  return (
    <select
      value={value}
      onChange={disabled ? undefined : onChange}
      disabled={disabled}
      style={getSelectStyles()}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => !disabled && setIsFocused(false)}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default { SelectInput };
