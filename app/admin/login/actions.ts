"use server";

import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function handleLoginAction(password: string) {
  const success = await login(password);
  if (success) {
    redirect("/admin");
  }
  return success;
}
