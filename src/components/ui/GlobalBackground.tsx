"use client";


import React from "react";
import { useTheme } from "@/hooks/useTheme";
import DarkBackground from "../ui/DarkBackground";
import LightBackground from "../ui/LightBackground";

export default function GlobalBackground() {
  const { theme } = useTheme();
  if (theme === "dark") return <DarkBackground />;
  if (theme === "light") return <LightBackground />;
  return null;
}
