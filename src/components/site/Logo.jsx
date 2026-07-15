import React from "react";

const LOGO_URL = "https://media.base44.com/images/public/6a42ca6def2b3fde835b3720/0643f48d8_RecPanbezpozadi.png";

export default function Logo({ variant = "dark", showSubtext = true, size = "md" }) {
  const imgHeight = size === "lg" ? 280 : size === "sm" ? 160 : 220;

  return (
    <img
      src={LOGO_URL}
      alt="RecPan — Solar Panel Recycling"
      style={{ height: imgHeight, width: "auto" }}
      className="object-contain"
    />
  );


}