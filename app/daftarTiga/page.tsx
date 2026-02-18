"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../globals.css";

export default function DaftarTigaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Kunci agar data tidak tertimpa

  // State untuk menyimpan teks esai
  const [formData, setFormData] = useState({
    motivation: "",
    contribution: "",
    problemSolving: "",
  });

  // --- LOGIKA PERSISTENCE START ---

  // 1. Ambil data dari localStorage saat pertama kali dibuka
  useEffect(() => {
    const savedData = localStorage.getItem("pendaftaran_step3");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setIsLoaded(true);
  }, []);

  // 2. Simpan ke localStorage setiap ada perubahan
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("pendaftaran_step3", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  // --- LOGIKA PERSISTENCE END ---

  // Fungsi penghitung kata sederhana
  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ambil data dari Step 1 dan Step 2 untuk digabungkan di Firebase (Opsional tapi disarankan)
      const step1 = JSON.parse(localStorage.getItem("pendaftaran_step1") || "{}");
      const step2 = JSON.parse(localStorage.getItem("pendaftaran_step2") || "{}");

      await addDoc(collection(db, "pendaftaran_final"), {
        identitas: step1,
        kompetensi: step2,
        esai: formData,
        submittedAt: serverTimestamp(),
      });

      alert("Pendaftaran Anda telah berhasil dikirim!");

      // Bersihkan semua storage setelah sukses
      localStorage.clear();

      router.push("/");
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Terjadi kesalahan saat mengirim data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 dark:bg-[#101622] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-['Space_Grotesk']">
      {/* Top Navigation Bar */}
      

      <main className="flex-1 flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-3xl">
          {/* Progress Section */}
          <div className="w-full max-w-2xl">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2 pt-16">Pendaftaran Anggota</h1>
              <p className="text-slate-400">Bergabunglah dengan komunitas talenta digital terbaik di Indonesia.</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Esai Motivation */}
              <div className="group">
                <div className="">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="text-left max-w-full md:max-w-[80%]">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#135bec]">Langkah 3 dari 3</span>
                      <h3 className="text-lg font-semibold text-white leading-tight">Mengapa kamu tertarik bergabung dengan Infotec Milenial?</h3>
                    </div>

                    {/* Badge Status */}
                    <div className="flex justify-start md:justify-end shrink-0">
                      <span className="text-sm font-medium text-blue-400 px-3 py-1 rounded-full border border-white/10 bg-blue-700/20 whitespace-nowrap">100% Selesai</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#135bec] rounded-full relative shadow-[0_0_15px_rgba(19,91,236,0.5)] transition-all duration-100 w-full"></div>
                  </div>
                </div>
              </div>

              {/* Esai Contribution */}
              <div className="group">
                <label className="block text-lg font-semibold mb-3 group-focus-within:text-[#135bec] transition-colors text-white">Apa yang bisa kamu berikan untuk kemajuan startup ini?</label>
                <div className="relative">
                  <textarea
                    name="contribution"
                    value={formData.contribution}
                    onChange={handleInputChange}
                    required
                    className="w-full min-h-[160px] bg-slate-900/40 dark:bg-[#192233] border-2 border-slate-800 dark:border-[#324467] focus:border-[#135bec] dark:focus:border-[#135bec] rounded-xl p-5 text-base outline-none transition-all resize-none text-white placeholder:text-slate-500"
                    placeholder="Sebutkan kontribusi atau ide unik yang ingin Anda bawa..."
                  ></textarea>
                  <div className="absolute bottom-4 right-4 text-xs text-slate-400">{getWordCount(formData.contribution)} / 500 kata</div>
                </div>
              </div>

              {/* Esai Problem Solving */}
              <div className="group">
                <label className="block text-lg font-semibold mb-3 group-focus-within:text-[#135bec] transition-colors text-white">
                  Sebutkan satu masalah yang ingin kamu selesaikan dengan teknologi saat ini.
                </label>
                <div className="relative">
                  <textarea
                    name="problemSolving"
                    value={formData.problemSolving}
                    onChange={handleInputChange}
                    required
                    className="w-full min-h-[160px] bg-slate-900/40 dark:bg-[#192233] border-2 border-slate-800 dark:border-[#324467] focus:border-[#135bec] dark:focus:border-[#135bec] rounded-xl p-5 text-base outline-none transition-all resize-none text-white placeholder:text-slate-500"
                    placeholder="Jelaskan masalah spesifik dan solusi teknologi Anda..."
                  ></textarea>
                  <div className="absolute bottom-4 right-4 text-xs text-slate-400">{getWordCount(formData.problemSolving)} / 500 kata</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                <button
                  onClick={() => router.back()}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-slate-800 dark:border-[#324467] font-bold text-slate-300 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                  type="button"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Kembali
                </button>
                <button
                  disabled={loading}
                  className="w-full flex-1 py-4 bg-[#135bec] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(19,91,236,0.4)] hover:shadow-[0_0_30px_rgba(19,91,236,0.6)] hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  {loading ? "Mengirim..." : "Kirim Pendaftaran"}
                  {!loading && <span className="material-symbols-outlined">send</span>}
                </button>
              </div>
            </form>
          </div>

          {/* Footer Note */}
          <div className="mt-12 p-6 rounded-xl bg-[#135bec]/5 border border-[#135bec]/10 flex gap-4 items-start">
            <span className="material-symbols-outlined text-[#135bec]">info</span>
            <p className="text-sm text-slate-400">Data Anda akan kami tinjau secara profesional. Pastikan esai yang Anda tulis mencerminkan potensi terbaik Anda.</p>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-[#135bec]/5 text-center text-slate-500 dark:text-slate-400 text-xs">
        <p>© 2024 Infotec Milenial. Membangun Masa Depan Digital Indonesia.</p>
      </footer>
    </div>
  );
}
