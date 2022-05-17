import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>ARTOFTRI.</h4>
      </div>

      <div className="midFooter">
        <p>Aesthetic design is our first priority</p>

        <p>Copyrights 2022 &copy; LuisitoJose</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a >Instagram</a>
        <a >Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;