"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email ou senha inválidos.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 block w-full rounded-md border border-amber-300 px-3 py-2 shadow-sm focus:border-[#1a5c2a] focus:outline-none focus:ring-1 focus:ring-[#1a5c2a] bg-white text-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 block w-full rounded-md border border-amber-300 px-3 py-2 shadow-sm focus:border-[#1a5c2a] focus:outline-none focus:ring-1 focus:ring-[#1a5c2a] bg-white text-sm"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded p-2">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-gradient-to-r from-[#f0c040] to-[#c9a227] px-4 py-2.5 text-[#0d2b1a] font-semibold hover:from-[#d4a017] hover:to-[#b8901f] disabled:opacity-50 transition shadow-md"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
