import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import "./index.css"; // Import the CSS variables

function App() {
  const [theme, setTheme] = useState("light");

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      style={{
        fontFamily: "var(--typography-fontFamily-primary)",
        color: "var(--color-text-primary)",
        backgroundColor: "var(--color-background-page)",
        minHeight: "100vh",
        padding: "var(--size-spacing-3xl)",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--size-spacing-xl)",
        }}
      >
        <h1
          style={{
            fontSize: "var(--size-font-3xl)",
            margin: 0,
            color: "var(--color-text-primary)",
          }}
        >
          Design Token Theme Demo
        </h1>

        <button
          onClick={toggleTheme}
          style={{
            padding: "var(--size-spacing-xs) var(--size-spacing-md)",
            backgroundColor: "var(--color-background-subtle)",
            color: "var(--color-text-primary)",
            border: `var(--border-width-xs) solid var(--color-text-disabled)`,
            borderRadius: "var(--border-radius-md)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "var(--size-spacing-xs)",
          }}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      <div
        style={{
          backgroundColor: "var(--color-background-surface)",
          padding: "var(--size-spacing-2xl)",
          borderRadius: "var(--border-radius-lg)",
          marginBottom: "var(--size-spacing-2xl)",
          boxShadow: "var(--effect-shadow-md)",
          border: `var(--border-width-xs) solid var(--color-background-subtle)`,
        }}
      >
        <h2
          style={{
            fontSize: "var(--size-font-xl)",
            marginBottom: "var(--size-spacing-lg)",
            color: "var(--color-text-primary)",
          }}
        >
          Current Theme: {theme === "light" ? "Light" : "Dark"}
        </h2>
        <p
          style={{
            fontSize: "var(--size-font-md)",
            marginBottom: "var(--size-spacing-lg)",
            color: "var(--color-text-secondary)",
            maxWidth: "800px",
            lineHeight: "var(--typography-lineHeight-normal)",
          }}
        >
          This demo shows how design tokens can be used to create a theme-aware
          interface. The buttons below use the same component, but display
          differently based on the current theme. Try switching between light
          and dark mode to see how the colors and styles adapt.
        </p>
      </div>

      <section
        style={{
          marginBottom: "var(--size-spacing-3xl)",
          backgroundColor: "var(--color-background-surface)",
          padding: "var(--size-spacing-2xl)",
          borderRadius: "var(--border-radius-lg)",
          boxShadow: "var(--effect-shadow-md)",
          border: `var(--border-width-xs) solid var(--color-background-subtle)`,
        }}
      >
        <h2
          style={{
            fontSize: "var(--size-font-xl)",
            marginBottom: "var(--size-spacing-xl)",
            color: "var(--color-text-primary)",
          }}
        >
          Button Components
        </h2>

        <div style={{ marginBottom: "var(--size-spacing-2xl)" }}>
          <h3
            style={{
              fontSize: "var(--size-font-lg)",
              marginBottom: "var(--size-spacing-md)",
              color: "var(--color-text-primary)",
            }}
          >
            Primary Buttons
          </h3>
          <div
            style={{
              display: "flex",
              gap: "var(--size-spacing-lg)",
              flexWrap: "wrap",
              marginBottom: "var(--size-spacing-lg)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--size-spacing-xs)",
              }}
            >
              <Button
                variant="primary"
                onClick={() => alert("Clicked primary button!")}
              >
                Primary Button
              </Button>
              <span
                style={{
                  fontSize: "var(--size-font-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Default
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--size-spacing-xs)",
              }}
            >
              <Button variant="primary" disabled>
                Primary Button
              </Button>
              <span
                style={{
                  fontSize: "var(--size-font-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Disabled
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "var(--size-spacing-2xl)" }}>
          <h3
            style={{
              fontSize: "var(--size-font-lg)",
              marginBottom: "var(--size-spacing-md)",
              color: "var(--color-text-primary)",
            }}
          >
            Secondary Buttons
          </h3>
          <div
            style={{
              display: "flex",
              gap: "var(--size-spacing-lg)",
              flexWrap: "wrap",
              marginBottom: "var(--size-spacing-lg)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--size-spacing-xs)",
              }}
            >
              <Button
                variant="secondary"
                onClick={() => alert("Clicked secondary button!")}
              >
                Secondary Button
              </Button>
              <span
                style={{
                  fontSize: "var(--size-font-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Default
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--size-spacing-xs)",
              }}
            >
              <Button variant="secondary" disabled>
                Secondary Button
              </Button>
              <span
                style={{
                  fontSize: "var(--size-font-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Disabled
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3
            style={{
              fontSize: "var(--size-font-lg)",
              marginBottom: "var(--size-spacing-md)",
              color: "var(--color-text-primary)",
            }}
          >
            Tertiary Buttons
          </h3>
          <div
            style={{
              display: "flex",
              gap: "var(--size-spacing-lg)",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--size-spacing-xs)",
              }}
            >
              <Button
                variant="tertiary"
                onClick={() => alert("Clicked tertiary button!")}
              >
                Tertiary Button
              </Button>
              <span
                style={{
                  fontSize: "var(--size-font-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Default
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--size-spacing-xs)",
              }}
            >
              <Button variant="tertiary" disabled>
                Tertiary Button
              </Button>
              <span
                style={{
                  fontSize: "var(--size-font-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Disabled
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "var(--color-background-surface)",
          padding: "var(--size-spacing-2xl)",
          borderRadius: "var(--border-radius-lg)",
          boxShadow: "var(--effect-shadow-md)",
          border: `var(--border-width-xs) solid var(--color-background-subtle)`,
        }}
      >
        <h2
          style={{
            fontSize: "var(--size-font-xl)",
            marginBottom: "var(--size-spacing-lg)",
            color: "var(--color-text-primary)",
          }}
        >
          Theme Token Information
        </h2>

        <p
          style={{
            marginBottom: "var(--size-spacing-md)",
            color: "var(--color-text-secondary)",
            lineHeight: "var(--typography-lineHeight-normal)",
          }}
        >
          This page uses theme tokens organized in global, light and dark sets.
          The tokens are applied dynamically based on the current theme.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "var(--size-spacing-xl)",
            marginTop: "var(--size-spacing-xl)",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "var(--size-font-lg)",
                marginBottom: "var(--size-spacing-sm)",
                color: "var(--color-text-primary)",
              }}
            >
              Color Samples
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--size-spacing-sm)",
              }}
            >
              <div
                style={{
                  padding: "var(--size-spacing-md)",
                  backgroundColor: "var(--color-background-page)",
                  borderRadius: "var(--border-radius-sm)",
                  border: `var(--border-width-xs) solid var(--color-background-subtle)`,
                }}
              >
                Background Page
              </div>
              <div
                style={{
                  padding: "var(--size-spacing-md)",
                  backgroundColor: "var(--color-background-surface)",
                  borderRadius: "var(--border-radius-sm)",
                  border: `var(--border-width-xs) solid var(--color-background-subtle)`,
                }}
              >
                Background Surface
              </div>
              <div
                style={{
                  padding: "var(--size-spacing-md)",
                  backgroundColor:
                    "var(--color-button-primary-background-default)",
                  color: "var(--color-button-primary-text-default)",
                  borderRadius: "var(--border-radius-sm)",
                }}
              >
                Primary Brand
              </div>
              <div
                style={{
                  padding: "var(--size-spacing-md)",
                  backgroundColor:
                    "var(--color-button-secondary-background-default)",
                  color: "var(--color-button-secondary-text-default)",
                  borderRadius: "var(--border-radius-sm)",
                }}
              >
                Secondary Brand
              </div>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: "var(--size-font-lg)",
                marginBottom: "var(--size-spacing-sm)",
                color: "var(--color-text-primary)",
              }}
            >
              Text Samples
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--size-spacing-md)",
              }}
            >
              <p style={{ margin: 0, color: "var(--color-text-primary)" }}>
                Primary text
              </p>
              <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
                Secondary text
              </p>
              <p style={{ margin: 0, color: "var(--color-text-disabled)" }}>
                Disabled text
              </p>
              <div
                style={{
                  padding: "var(--size-spacing-sm)",
                  backgroundColor:
                    "var(--color-button-primary-background-default)",
                }}
              >
                <p style={{ margin: 0, color: "var(--color-text-inverse)" }}>
                  Inverse text
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
