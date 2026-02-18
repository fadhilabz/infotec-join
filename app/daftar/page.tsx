"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    whatsapp: "",
    major: "",
    year: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("pendaftaran_step1");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("pendaftaran_step1", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Langsung navigasi tanpa push ke Firebase
    router.push("/daftarDua");
  };

  return (
    <div
      className="bg-slate-950 dark:bg-[#101622] text-slate-900 dark:text-slate-100 min-h-screen relative overflow-x-hidden font-[family-name:var(--font-space-grotesk)]"
      style={{
        backgroundImage: "radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), transparent), radial-gradient(circle at bottom left, rgba(19, 91, 236, 0.15), transparent)",
      }}
    >
      <div className="relative flex min-h-screen w-full flex-col">
        

        <main className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-2xl">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2 pt-12">Pendaftaran Anggota</h1>
              <p className="text-slate-400">Bergabunglah dengan komunitas talenta digital terbaik di Indonesia.</p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#192233]/70 backdrop-blur-[12px]">
              <div className="px-8 pt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#135bec]">Langkah 1 dari 3</span>
                    <h3 className="text-lg font-semibold text-white">Identitas & Kontak</h3>
                  </div>
                  <div className="flex justify-start md:justify-end">
                    <span className="text-sm font-medium text-blue-400 px-3 py-1 rounded-full border border-white/10 bg-blue-700/20 whitespace-nowrap">33% Selesai</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#135bec] rounded-full relative shadow-[0_0_15px_rgba(19,91,236,0.5)] transition-all duration-500 w-1/3"></div>
                </div>
              </div>

              <form className="p-8 space-y-6" onSubmit={handleNext}>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300" htmlFor="email">Alamat Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#135bec] transition-colors">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-4 py-3.5 bg-[#101622]/50 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] transition-all outline-none"
                      id="email"
                      placeholder="nama@email.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300" htmlFor="whatsapp">Nomor WhatsApp</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                    </div>
                    <input
                      required
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-4 py-3.5 bg-[#101622]/50 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all outline-none"
                      id="whatsapp"
                      placeholder="Contoh: 081234567890"
                      type="tel"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300" htmlFor="major">Program Studi</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#8b5cf6] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">school</span>
                      </div>
                      <select
                        required
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-10 py-3.5 bg-[#101622]/50 border border-white/10 rounded-xl text-white appearance-none focus:ring-2 focus:ring-[#8b5cf6]/50 focus:border-[#8b5cf6] transition-all outline-none"
                        id="major"
                      >
                        <option value="" className="bg-[#192233]">Pilih Jurusan</option>
                        <option value="if" className="bg-[#192233]">Teknik Informatika</option>
                        <option value="si" className="bg-[#192233]">Sistem Informasi</option>
                        <option value="dkv" className="bg-[#192233]">DKV / Multimedia</option>
                        <option value="te" className="bg-[#192233]">Teknik Elektro</option>
                        <option value="other" className="bg-[#192233]">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300" htmlFor="year">Angkatan</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#135bec] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                      </div>
                      <input
                        required
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-3.5 bg-[#101622]/50 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] transition-all outline-none"
                        id="year"
                        placeholder="2023"
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-end">
                  <button
                    disabled={loading}
                    className="bg-[#135bec] hover:bg-[#135bec]/90 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-[#135bec]/25 flex items-center gap-2 group disabled:opacity-50"
                    type="submit"
                  >
                    {loading ? "Menyimpan..." : "Selanjutnya"}
                    {!loading && <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}