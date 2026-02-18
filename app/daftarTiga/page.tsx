"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Script from "next/script";
import "../globals.css";

export default function DaftarTigaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [formData, setFormData] = useState({
    motivation: "",
    contribution: "",
    problemSolving: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("pendaftaran_step3");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("pendaftaran_step3", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

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
      const step1 = JSON.parse(localStorage.getItem("pendaftaran_step1") || "{}");
      const step2 = JSON.parse(localStorage.getItem("pendaftaran_step2") || "{}");

      await addDoc(collection(db, "pendaftaran_final"), {
        identitas: step1,
        kompetensi: step2,
        esai: formData,
        submittedAt: serverTimestamp(),
      });

      alert("Pendaftaran Anda telah berhasil dikirim!");
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
      
      <main className="flex-1 flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-3xl">
          <div className="w-full max-w-2xl">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2 pt-16">Pendaftaran Anggota</h1>
              <p className="text-slate-400">Tahap akhir: Ceritakan motivasi dan visimu.</p>
            </div>
          </div>

          <div className="bg-[#192233]/70 backdrop-blur-[12px] border border-white/10 rounded-xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="text-left max-w-full md:max-w-[80%]">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#135bec]">Langkah 3 dari 3</span>
                    <h3 className="text-lg font-semibold text-white leading-tight">Esai Singkat</h3>
                  </div>
                  <div className="flex justify-start md:justify-end shrink-0">
                    <span className="text-sm font-medium text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 whitespace-nowrap">Hampir Selesai</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#135bec] rounded-full relative shadow-[0_0_15px_rgba(19,91,236,0.5)] transition-all duration-1000 w-full"></div>
                </div>
              </div>

              <div className="group">
                <label className="block text-lg font-semibold mb-3 group-focus-within:text-[#135bec] transition-colors text-white">Apa yang bisa kamu berikan untuk kemajuan startup ini?</label>
                <div className="relative">
                  <textarea
                    name="contribution"
                    value={formData.contribution}
                    onChange={handleInputChange}
                    required
                    className="w-full min-h-[160px] bg-[#101622]/50 border-2 border-white/10 focus:border-[#135bec] rounded-xl p-5 text-base outline-none transition-all resize-none text-white"
                    placeholder="Sebutkan kontribusi atau ide unik Anda..."
                  ></textarea>
                  <div className="absolute bottom-4 right-4 text-xs text-slate-500">{getWordCount(formData.contribution)} / 500 kata</div>
                </div>
              </div>

              <div className="group">
                <label className="block text-lg font-semibold mb-3 group-focus-within:text-[#135bec] transition-colors text-white">
                  Masalah yang ingin diselesaikan dengan teknologi?
                </label>
                <div className="relative">
                  <textarea
                    name="problemSolving"
                    value={formData.problemSolving}
                    onChange={handleInputChange}
                    required
                    className="w-full min-h-[160px] bg-[#101622]/50 border-2 border-white/10 focus:border-[#135bec] rounded-xl p-5 text-base outline-none transition-all resize-none text-white"
                    placeholder="Jelaskan masalah dan solusi teknologi Anda..."
                  ></textarea>
                  <div className="absolute bottom-4 right-4 text-xs text-slate-500">{getWordCount(formData.problemSolving)} / 500 kata</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                <button
                  onClick={() => router.back()}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-white/10 font-bold text-slate-300 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                  type="button"
                >
                  <span className="material-symbols-outlined">arrow_back</span> Kembali
                </button>
                <button
                  disabled={loading}
                  className="w-full flex-1 py-4 bg-[#135bec] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(19,91,236,0.4)] hover:shadow-[0_0_30px_rgba(19,91,236,0.6)] transition-all disabled:opacity-50"
                  type="submit"
                >
                  {loading ? "Mengirim..." : "Kirim Pendaftaran"}
                  {!loading && <span className="material-symbols-outlined">send</span>}
                </button>
              </div>

              {/* IKLAN DINAMIS */}
              <div className="ad-container border-t border-white/5 pt-8 flex flex-col items-center min-w-full">
                <Script 
                  id="adsterra-final-dynamic" 
                  src="https://pl28739205.effectivegatecpm.com/fc/9c/51/fc9c518cb9345ecd37fbd43b17b42077.js" 
                  strategy="afterInteractive" 
                />
                <div 
                  id="container-fc9c518cb9345ecd37fbd43b17b42077" 
                  className="w-full flex justify-center items-center rounded-lg transition-all duration-500 empty:h-0 overflow-hidden"
                ></div>
              </div>
            </form>
          </div>

          <div className="mt-12 p-6 rounded-xl bg-[#135bec]/5 border border-[#135bec]/10 flex gap-4 items-start">
            <span className="material-symbols-outlined text-[#135bec]">info</span>
            <p className="text-sm text-slate-400">Data Anda akan kami tinjau secara profesional. Pastikan esai mencerminkan potensi terbaik Anda.</p>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-[#135bec]/5 text-center text-slate-500 text-xs">
        <p>© 2026 Infotec Milenial. Membangun Masa Depan Digital Indonesia.</p>
      </footer>
    </div>
  );
}