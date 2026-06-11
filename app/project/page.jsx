"use client"
import { Suspense } from "react";
import Project from "@/src-pages/Project";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Project />
    </Suspense>
  );
}