"use client";

import dynamic from "next/dynamic";
import Particles from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const Globe = dynamic(() => import("@/components/magicui/globe"), { ssr: false });

export default function GlobeAndStars() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#808080");
  }, [theme]);

  return (
    <div className="">
      <Particles className="" quantity={150} ease={80} color={color} refresh />
      <Globe />
    </div>
  );
}
