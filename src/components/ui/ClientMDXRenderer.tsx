"use client";
import dynamic from "next/dynamic";
import React from "react";

// Dynamic import del MDXRenderer, solo en cliente
const MDXRenderer = dynamic(() => import("./MDXRenderer"), { ssr: false });

export default function ClientMDXRenderer({ code }: { code: string }) {
  return <MDXRenderer code={code} />;
}
