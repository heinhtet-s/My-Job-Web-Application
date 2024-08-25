import SeekerLayout from "@/components/share/SeekerLayout";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeekerLayout>{children}</SeekerLayout>;
}
