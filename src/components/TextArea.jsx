
import React, { useState } from "react";

export const TextArea = ({
  value,
  onChange,
  placeholder = "",
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getTextAreaStyles = () => {
    const state = disabled ? "disabled" : isFocused ? "focus" : "default";

    return {
      backgroundColor: `var(--color-textarea-background-${state})`,
      color: `var(--color-textarea-text-${state})`,
      border: `var(--border-width-xs) solid var(--color-textarea-border-${state})`,
      borderRadius: `var(--component-textarea-borderRadius)`,
      padding: `var(--component-textarea-padding-y) var(--component-textarea-padding-x)`,
      fontSize: `var(--component-textarea-fontSize)`,
      fontFamily: `var(--typography-fontFamily-primary)`,
      cursor: disabled ? "not-allowed" : "text",
      outline: "none",
      transition: "all 0.2s ease-in-out",
    };
  };

  return (
    <textarea
      value={value}
      onChange={disabled ? undefined : onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={getTextAreaStyles()}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => !disabled && setIsFocused(false)}
    />
  );
};

export default { TextArea };
