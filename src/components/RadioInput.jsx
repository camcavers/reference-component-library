
import React, { useState } from "react";

export const RadioInput = ({
  checked,
  onChange,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getRadioStyles = () => {
    const state = disabled ? "disabled" : isFocused ? "focus" : "default";

    return {
      backgroundColor: `var(--color-radio-background-${state})`,
      color: `var(--color-radio-text-${state})`,
      border: `var(--border-width-xs) solid var(--color-radio-border-${state})`,
      borderRadius: `var(--component-radio-borderRadius)`,
      padding: `var(--component-radio-padding-y) var(--component-radio-padding-x)`,
      fontSize: `var(--component-radio-fontSize)`,
      fontFamily: `var(--typography-fontFamily-primary)`,
      cursor: disabled ? "not-allowed" : "pointer",
      outline: "none",
      transition: "all 0.2s ease-in-out",
    };
  };

  return (
    <input
      type="radio"
      checked={checked}
      onChange={disabled ? undefined : onChange}
      disabled={disabled}
      style={getRadioStyles()}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => !disabled && setIsFocused(false)}
    />
  );
};

export default { RadioInput };
