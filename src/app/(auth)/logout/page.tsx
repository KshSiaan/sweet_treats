"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const [{ token }, , removeCookie] = useCookies(["token"]);
  const navig = useRouter();
  useEffect(() => {
    removeCookie("token", { path: "/" });
    navig.replace("/login");
  }, []);
  return <div>Signing out...</div>;
}
