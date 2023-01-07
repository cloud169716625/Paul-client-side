import React from "react";
import ReactGoogleInvisibleRecaptcha from "react-google-invisible-recaptcha";

const Recaptcha = ({refRecaptcha}) => {
  
  return (
    <ReactGoogleInvisibleRecaptcha
      sitekey={process.env.REACT_APP_SITE_KEY}
      ref={refRecaptcha}
      onResolved={() => console.log("Human detected.")}
    />
  );
};

export default Recaptcha;
