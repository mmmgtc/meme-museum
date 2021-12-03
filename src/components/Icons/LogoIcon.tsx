import { Image } from "@chakra-ui/react";
import React from "react";

function LogoIcon({
  size = "64px",
  logoPath,
}: {
  size?: string;
  logoPath: string;
}) {
  return <Image src={logoPath} w={size} />;
}

export default LogoIcon;
