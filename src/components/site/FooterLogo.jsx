import React from "react";

const FOOTER_LOGO_URL = "https://media.base44.com/images/public/6a42ca6def2b3fde835b3720/0643f48d8_RecPanbezpozadi.png";

export default function FooterLogo() {
  return (
    <img
      src={FOOTER_LOGO_URL}
      alt="RecPan — Solar Panel Recycling"
      style={{ height: 240, width: "auto", filter: "brightness(0) invert(1)" }}
      className="object-contain select-none pointer-events-none"
    />
  );
}