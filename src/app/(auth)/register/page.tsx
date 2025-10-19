"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Semua field harus diisi!");
      return;
    }

    // ambil daftar user dari localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // cek apakah email sudah terdaftar
    const userExists = users.find((u: any) => u.email === email);
    if (userExists) {
      setMessage("Email sudah terdaftar.");
      return;
    }

    // simpan user baru
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Registrasi berhasil! Silakan login.");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Daftar Akun</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-md"
        />
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
          Daftar
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
      <p className="text-center mt-4 text-sm">
        Sudah punya akun?{" "}
        <span
          onClick={() => router.push("/login")}
          className="text-teal-600 hover:underline cursor-pointer"
        >
          Masuk di sini
        </span>
      </p>
    </div>
  );
}
