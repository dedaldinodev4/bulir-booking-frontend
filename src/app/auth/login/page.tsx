"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  async function handleLogin() {
    await signIn("credentials", {
      email: "test@email.com",
      password: "123456",
      redirect: false,
    });
  }

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
}
