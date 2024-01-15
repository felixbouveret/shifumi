import "./Footer.scss";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <p>
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by{" "}
        <a href="https://github.com/felixbouveret" target="_blank">
          Félix Bouveret
        </a>{" "}
        - See codebase{" "}
        <a href="https://github.com/felixbouveret/shifumi" target="_blank">
          here
        </a>
      </p>
    </footer>
  );
};

export default Footer;
