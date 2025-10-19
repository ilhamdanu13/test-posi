"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { examsData } from "@/app/data/exams";

export default function ExamsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  return (
    <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-md mx-auto">
      {user ? (
        <>
          <h2 className="text-2xl font-bold mb-2">Halo, {user.name} 👋</h2>
          <p className="text-gray-600 mb-6">
            Pilih ujian yang ingin kamu kerjakan:
          </p>

          <div className="space-y-4">
            {examsData.map((exam) => (
              <div
                key={exam.id}
                className="p-4 border rounded-xl hover:bg-teal-50 cursor-pointer"
                onClick={() => router.push(`/exams/${exam.id}`)}
              >
                <h3 className="font-semibold text-lg">{exam.title}</h3>
                <p className="text-gray-500 text-sm">{exam.description}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              router.push("/login");
            }}
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Memuat...</p>
      )}
    </div>
  );
}
