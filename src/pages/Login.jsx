import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setIsSubmitting(true);

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    console.log("Attempting login with:", { email, password });
    setTimeout(() => {
      if (email === "user@example.com" && password === "password123") {
        console.log("Login successful!");
        alert("Login successful!");
        // In a real app, you'd redirect or set auth state here
      } else {
        setError("Invalid email or password.");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  // Inline Styles
  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh", // Changed from 100vh to give some space if part of a larger page
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f7f6",
    padding: "20px",
  };

  const formStyle = {
    backgroundColor: "#ffffff",
    padding: "40px", // Increased padding
    borderRadius: "10px", // Slightly more pronounced radius
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", // Softer, more diffused shadow
    width: "100%",
    maxWidth: "380px", // Slightly wider
    display: "flex",
    flexDirection: "column",
    gap: "20px", // Space between elements
  };

  const titleStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "10px", // Reduced margin as gap handles spacing
    fontSize: "24px",
    fontWeight: "600",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    marginBottom: "8px",
    color: "#555",
    fontSize: "14px",
    fontWeight: "500",
  };

  const inputStyle = {
    padding: "12px 15px", // More padding
    border: "1px solid #ccc", // Slightly darker border for better contrast
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box",
    width: "100%",
    transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  };

  // It's tricky to do :focus with pure inline styles without JS event handlers.
  // For simplicity, we'll skip direct :focus styling in this minimal example.
  // If needed, you could add onFocus/onBlur handlers to toggle a style object.

  const buttonStyle = {
    padding: "12px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    width: "100%",
    transition: "background-color 0.2s ease-in-out",
    marginTop: "10px", // Add some space above the button
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  };

  const errorStyle = {
    color: "red",
    textAlign: "center",
    fontSize: "14px",
    minHeight: "20px", // Reserve space to prevent layout shifts
    marginBottom: "10px",
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Login</h2>
        {error && <div style={errorStyle}>{error}</div>}
        <div style={inputGroupStyle}>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="you@example.com"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          style={isSubmitting ? disabledButtonStyle : buttonStyle}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
