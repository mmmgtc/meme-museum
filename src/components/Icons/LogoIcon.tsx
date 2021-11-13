import React from "react";

function LogoIcon({ size = "64px" }: { size?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M64 0H0V64H64V0Z" fill="#261753" />
      <path
        d="M40 56V8L32 16L24 8V56"
        stroke="#8759F7"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M48 48V16L32 32L16 16V48"
        stroke="#FF7E69"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M56 40V24L32 48L8 24V40"
        stroke="#73FAD1"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export default LogoIcon;
