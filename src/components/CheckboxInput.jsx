
import React, { useState } from "react";

export const CheckboxInput = ({
  checked,
  onChange,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getCheckboxStyles = () => {
    const state = disabled ? "disabled" : isFocused ? "focus" : "default";

    return {
      backgroundColor: `var(--color-checkbox-background-${state})`,
      color: `var(--color-checkbox-text-${state})`,
      border: `var(--border-width-xs) solid var(--color-checkbox-border-${state})`,
      borderRadius: `var(--component-checkbox-borderRadius)`,
      padding: `var(--component-checkbox-padding-y) var(--component-checkbox-padding-x)`,
      fontSize: `var(--component-checkbox-fontSize)`,
      fontFamily: `var(--typography-fontFamily-primary)`,
      cursor: disabled ? "not-allowed" : "pointer",
      outline: "none",
      transition: "all 0.2s ease-in-out",
    };
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={disabled ? undefined : onChange}
      disabled={disabled}
      style={getCheckboxStyles()}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => !disabled && setIsFocused(false)}
    />
  );
};

export default { CheckboxInput };
