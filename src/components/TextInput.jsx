
import React, { useState } from "react";

export const TextInput = ({
  value,
  onChange,
  placeholder = "",
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyles = () => {
    const state = disabled ? "disabled" : isFocused ? "focus" : "default";

    return {
      backgroundColor: `var(--color-input-background-${state})`,
      color: `var(--color-input-text-${state})`,
      border: `var(--border-width-xs) solid var(--color-input-border-${state})`,
      borderRadius: `var(--component-input-borderRadius)`,
      padding: `var(--component-input-padding-y) var(--component-input-padding-x)`,
      fontSize: `var(--component-input-fontSize)`,
      fontFamily: `var(--typography-fontFamily-primary)`,
      cursor: disabled ? "not-allowed" : "text",
      outline: "none",
      transition: "all 0.2s ease-in-out",
    };
  };

  return (
    <input
      type="text"
      value={value}
      onChange={disabled ? undefined : onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={getInputStyles()}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => !disabled && setIsFocused(false)}
    />
  );
};

export default { TextInput };
