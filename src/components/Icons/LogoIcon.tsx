import { Image } from "@chakra-ui/react";
import React from "react";

function LogoIcon({ size = "64px" }: { size?: string }) {
  return <Image src="/memes-party.png" w={size} />;
}

export default LogoIcon;
