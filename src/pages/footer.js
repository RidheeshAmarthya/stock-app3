// Footer.js
import React from "react";

function Footer() {
  // Define the styles object
  const footerStyle = {
    fontFamily: "Arial",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    backgroundColor: "#f0f0f0", // Example background color
    color: "black", // Example text color
  };

  const contentStyle = {
    marginBottom: "60px", // Adjust as necessary to make space for the footer
  };

  return (
    <React.Fragment>
      <div style={contentStyle}>{/* Content goes here */}</div>
      <footer style={footerStyle}>
        Powered by{" "}
        <a
          href="https://finnhub.io"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue" }}
        >
          <strong>Finnhub.io</strong>
        </a>{" "}
        {/* You can also inline style the anchor tag */}
      </footer>
    </React.Fragment>
  );
}

export default Footer;
