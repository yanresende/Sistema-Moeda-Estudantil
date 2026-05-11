"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm text-green-300 hover:text-[#f0c040] transition font-medium"
    >
      Sair
    </button>
  );
}
