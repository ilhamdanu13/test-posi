"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      router.push("/exams");
    } else {
      setMessage("Email atau password salah.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Masuk</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Kata sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
        >
          Masuk
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
      <p className="text-center mt-4 text-sm">
        Belum punya akun?{" "}
        <span
          onClick={() => router.push("/register")}
          className="text-teal-600 hover:underline cursor-pointer"
        >
          Daftar di sini
        </span>
      </p>
    </div>
  );
}
