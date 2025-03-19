import React, { useState } from "react";

export const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  disabled = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const getButtonStyles = () => {
    const state = disabled ? "disabled" : isActive ? "active" : isHovered ? "hover" : "default";
    
    return {
      backgroundColor: `var(--color-button-${variant}-background-${state})`,
      color: `var(--color-button-${variant}-text-${state})`,
      border: `var(--border-width-xs) solid var(--color-button-${variant}-border-${state})`,
      borderRadius: `var(--component-button-borderRadius)`,
      padding: `var(--component-button-padding-y) var(--component-button-padding-x)`,
      fontSize: `var(--component-button-fontSize)`,
      fontWeight: `var(--component-button-fontWeight)`,
      fontFamily: `var(--typography-fontFamily-primary)`,
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: isHovered 
        ? `var(--component-button-shadow-hover)` 
        : `var(--component-button-shadow-default)`,
      transition: "all 0.2s ease-in-out",
      outline: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      lineHeight: 1.2,
      position: "relative"
    };
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={getButtonStyles()}
      onMouseOver={() => !disabled && setIsHovered(true)}
      onMouseOut={() => {
        !disabled && setIsHovered(false);
        !disabled && setIsActive(false);
      }}
      onMouseDown={() => !disabled && setIsActive(true)}
      onMouseUp={() => !disabled && setIsActive(false)}
      onFocus={() => !disabled && setIsHovered(true)}
      onBlur={() => {
        !disabled && setIsHovered(false);
        !disabled && setIsActive(false);
      }}
    >
      {children}
    </button>
  );
};

export default Button;