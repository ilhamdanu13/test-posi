"use client";

import { useParams, useRouter } from "next/navigation";
import { examsData } from "@/app/data/exams";
import { useState, useEffect } from "react";

export default function ExamDetailPage() {
  const router = useRouter();
  const params = useParams();
  const examId = params.id as string;

  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) router.push("/login");

    const foundExam = examsData.find((e) => e.id === examId);
    if (!foundExam) router.push("/exams");
    else setExam(foundExam);
  }, [examId, router]);

  const handleSelect = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    if (!exam) return;
    let correct = 0;
    exam.questions.forEach((q: any) => {
      if (answers[q.id] === q.answer) correct++;
    });
    const total = exam.questions.length;
    const result = Math.round((correct / total) * 100);
    setScore(result);
    setSubmitted(true);

    // simpan hasil ke localStorage
    const results = JSON.parse(localStorage.getItem("examResults") || "[]");
    results.push({
      examId: exam.id,
      examTitle: exam.title,
      score: result,
      date: new Date().toLocaleString(),
    });
    localStorage.setItem("examResults", JSON.stringify(results));
  };

  if (!exam) return <p>Memuat ujian...</p>;

  return (
    <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{exam.title}</h2>

      {!submitted ? (
        <>
          {exam.questions.map((q: any, index: number) => (
            <div key={q.id} className="mb-6">
              <p className="font-semibold mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt: string) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer ${
                      answers[q.id] === opt
                        ? "bg-teal-100 border-teal-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleSelect(q.id, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 w-full"
          >
            Kirim Jawaban
          </button>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Hasil Ujian</h3>
          <p className="text-lg">
            Skor kamu: <span className="font-bold text-teal-600">{score}%</span>
          </p>

          <button
            onClick={() => router.push("/exams")}
            className="mt-6 bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Kembali ke daftar ujian
          </button>
        </div>
      )}
    </div>
  );
}
