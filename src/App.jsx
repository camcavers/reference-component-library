import React from "react";
import Button from "./components/Button";
import "./index.css"; // Import the CSS variables

function App() {
  return (
    <div style={{ 
      fontFamily: "var(--typography-fontFamily-primary)",
      color: "var(--color-text-primary)",
      padding: "var(--size-spacing-3xl)",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      <h1 style={{ 
        fontSize: "var(--size-font-3xl)", 
        marginBottom: "var(--size-spacing-xl)",
        color: "var(--color-base-default-800)"
      }}>
        Design Token Button Components
      </h1>
      
      <section style={{ 
        marginBottom: "var(--size-spacing-3xl)",
        backgroundColor: "var(--color-base-neutral-gray-100)",
        padding: "var(--size-spacing-2xl)",
        borderRadius: "var(--border-radius-lg)"
      }}>
        <h2 style={{ 
          fontSize: "var(--size-font-xl)", 
          marginBottom: "var(--size-spacing-lg)",
          color: "var(--color-base-default-700)"
        }}>
          Primary Buttons
        </h2>
        <div style={{ 
          display: "flex", 
          gap: "var(--size-spacing-lg)",
          flexWrap: "wrap",
          marginBottom: "var(--size-spacing-xl)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--size-spacing-xs)" }}>
            <Button variant="primary" onClick={() => alert("Clicked primary button!")}>
              Primary Button
            </Button>
            <span style={{ fontSize: "var(--size-font-sm)", color: "var(--color-text-secondary)" }}>Default</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--size-spacing-xs)" }}>
            <Button variant="primary" disabled>
              Primary Button
            </Button>
            <span style={{ fontSize: "var(--size-font-sm)", color: "var(--color-text-secondary)" }}>Disabled</span>
          </div>
        </div>
        
        <h2 style={{ 
          fontSize: "var(--size-font-xl)", 
          marginBottom: "var(--size-spacing-lg)",
          color: "var(--color-base-secondary-700)" 
        }}>
          Secondary Buttons
        </h2>
        <div style={{ 
          display: "flex", 
          gap: "var(--size-spacing-lg)",
          flexWrap: "wrap",
          marginBottom: "var(--size-spacing-xl)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--size-spacing-xs)" }}>
            <Button variant="secondary" onClick={() => alert("Clicked secondary button!")}>
              Secondary Button
            </Button>
            <span style={{ fontSize: "var(--size-font-sm)", color: "var(--color-text-secondary)" }}>Default</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--size-spacing-xs)" }}>
            <Button variant="secondary" disabled>
              Secondary Button
            </Button>
            <span style={{ fontSize: "var(--size-font-sm)", color: "var(--color-text-secondary)" }}>Disabled</span>
          </div>
        </div>
        
        <h2 style={{ 
          fontSize: "var(--size-font-xl)", 
          marginBottom: "var(--size-spacing-lg)",
          color: "var(--color-base-tertiary-700)" 
        }}>
          Tertiary Buttons
        </h2>
        <div style={{ 
          display: "flex", 
          gap: "var(--size-spacing-lg)",
          flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--size-spacing-xs)" }}>
            <Button variant="tertiary" onClick={() => alert("Clicked tertiary button!")}>
              Tertiary Button
            </Button>
            <span style={{ fontSize: "var(--size-font-sm)", color: "var(--color-text-secondary)" }}>Default</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--size-spacing-xs)" }}>
            <Button variant="tertiary" disabled>
              Tertiary Button
            </Button>
            <span style={{ fontSize: "var(--size-font-sm)", color: "var(--color-text-secondary)" }}>Disabled</span>
          </div>
        </div>
      </section>
      
      <section style={{ 
        backgroundColor: "var(--color-base-neutral-white)",
        padding: "var(--size-spacing-2xl)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--effect-shadow-md)",
        border: `var(--border-width-xs) solid var(--color-base-neutral-gray-200)`
      }}>
        <h2 style={{ 
          fontSize: "var(--size-font-xl)", 
          marginBottom: "var(--size-spacing-lg)",
          color: "var(--color-text-primary)" 
        }}>
          Design Token Information
        </h2>
        <p style={{ 
          marginBottom: "var(--size-spacing-md)",
          color: "var(--color-text-secondary)",
          lineHeight: "var(--typography-lineHeight-normal)"
        }}>
          This component uses design tokens exported from Figma via Tokens Studio, processed with Style Dictionary.
        </p>
        
        <h3 style={{ 
          fontSize: "var(--size-font-lg)", 
          marginTop: "var(--size-spacing-lg)",
          marginBottom: "var(--size-spacing-sm)",
          color: "var(--color-text-primary)" 
        }}>
          Sample Token Variables
        </h3>
        <ul style={{ 
          paddingLeft: "var(--size-spacing-xl)",
          marginBottom: "var(--size-spacing-xl)"
        }}>
          <li style={{ marginBottom: "var(--size-spacing-xs)" }}>
            <code style={{ 
              backgroundColor: "var(--color-base-neutral-gray-100)",
              padding: "var(--size-spacing-2xs) var(--size-spacing-xs)",
              borderRadius: "var(--border-radius-xs)",
              fontFamily: "monospace"
            }}>
              --color-button-primary-background-default
            </code>: {" "}
            <span style={{ 
              display: "inline-block",
              width: "16px",
              height: "16px",
              backgroundColor: "var(--color-button-primary-background-default)",
              borderRadius: "var(--border-radius-xs)",
              marginRight: "var(--size-spacing-xs)",
              verticalAlign: "middle"
            }}></span>
            <code>var(--color-base-default-800)</code> or <code>#183750</code>
          </li>
          <li style={{ marginBottom: "var(--size-spacing-xs)" }}>
            <code style={{ 
              backgroundColor: "var(--color-base-neutral-gray-100)",
              padding: "var(--size-spacing-2xs) var(--size-spacing-xs)",
              borderRadius: "var(--border-radius-xs)",
              fontFamily: "monospace"
            }}>
              --component-button-borderRadius
            </code>: {" "}
            <code>var(--border-radius-md)</code> or <code>8px</code>
          </li>
          <li>
            <code style={{ 
              backgroundColor: "var(--color-base-neutral-gray-100)",
              padding: "var(--size-spacing-2xs) var(--size-spacing-xs)",
              borderRadius: "var(--border-radius-xs)",
              fontFamily: "monospace"
            }}>
              --typography-fontFamily-primary
            </code>: {" "}
            <code>'Inter', sans-serif</code>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;