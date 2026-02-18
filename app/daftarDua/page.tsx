"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../globals.css";

export default function DaftarDuaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Kunci agar data tidak tertimpa

  const [formData, setFormData] = useState({
    roles: [] as string[],
    skills: ["ReactJS", "Tailwind CSS", "Git"],
    experience: "intermediate",
    portfolio: "",
    github: "",
    linkedin: "",
    behance: "",
  });

  const [currentSkill, setCurrentSkill] = useState("");

  // 1. Load data saat halaman dibuka
  useEffect(() => {
    const savedData = localStorage.getItem("pendaftaran_step2");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setIsLoaded(true); // Tandai data sudah selesai dimuat
  }, []);

  // 2. Simpan data setiap kali formData berubah
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("pendaftaran_step2", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      roles: checked ? [...prev.roles, value] : prev.roles.filter((role) => role !== value),
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, experience: e.target.value });
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(currentSkill.trim())) {
        setFormData({ ...formData, skills: [...formData.skills, currentSkill.trim()] });
      }
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skillToRemove) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "kompetensi_pendaftar"), {
        ...formData,
        step: 2,
        createdAt: serverTimestamp(),
      });
      router.push("/daftarTiga");
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#101622] text-slate-100 min-h-screen selection:bg-[#135bec]/30 font-['Space_Grotesk']">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2 pt-16">Pendaftaran Anggota</h1>
            <p className="text-slate-400">Bergabunglah dengan komunitas talenta digital terbaik di Indonesia.</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-10">
            <section>
              <div className="pb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#135bec]">Langkah 2 dari 3</span>
                    <h3 className="text-lg font-semibold text-white">Pilih Divisi / Role</h3>
                  </div>

                  {/* Container untuk badge agar posisinya rapi di HP maupun Desktop */}
                  <div className="flex justify-start md:justify-end">
                    <span className="text-sm font-medium text-blue-400 px-3 py-1 rounded-full border border-white/10 bg-blue-700/20 whitespace-nowrap">75% Selesai</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#135bec] rounded-full relative shadow-[0_0_15px_rgba(19,91,236,0.5)] transition-all duration-500 w-3/4"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["web", "design", "mobile"].map((roleKey) => (
                  <label key={roleKey} className="relative group cursor-pointer">
                    <input className="peer sr-only" type="checkbox" name="role" value={roleKey} checked={formData.roles.includes(roleKey)} onChange={handleRoleChange} />
                    <div className="h-full p-5 rounded-xl border border-white/10 bg-white/5 peer-checked:border-[#135bec] peer-checked:bg-[#135bec]/5 group-hover:bg-white/10 transition-all flex flex-col gap-3">
                      <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-[#135bec] peer-checked:text-[#135bec]">
                        {roleKey === "web" ? "terminal" : roleKey === "design" ? "palette" : "smartphone"}
                      </span>
                      <div>
                        <p className="font-bold text-lg text-white">{roleKey === "web" ? "Web Development" : roleKey === "design" ? "UI/UX Design" : "Mobile App"}</p>
                        <p className="text-sm text-slate-500">{roleKey === "web" ? "React, Node, PHP" : roleKey === "design" ? "Figma, Prototyping" : "Flutter, Kotlin"}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#135bec]">psychology</span>
                  <h3 className="text-xl font-semibold text-white">Skill Utama</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 min-h-[100px] bg-slate-900/50 border border-white/10 rounded-lg focus-within:border-[#135bec] transition-colors">
                    {formData.skills.map((skill) => (
                      <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-[#135bec]/20 text-[#135bec] text-sm font-medium rounded-full border border-[#135bec]/30">
                        {skill}{" "}
                        <span onClick={() => removeSkill(skill)} className="material-symbols-outlined text-xs cursor-pointer">
                          close
                        </span>
                      </span>
                    ))}
                    <input
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyDown={addSkill}
                      className="bg-transparent border-none focus:ring-0 text-sm flex-1 min-w-[120px] text-white"
                      placeholder="Tambah skill..."
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#135bec]">signal_cellular_alt</span>
                  <h3 className="text-xl font-semibold text-white">Tingkat Pengalaman</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {["beginner", "intermediate", "expert"].map((lvl) => (
                    <label
                      key={lvl}
                      className={`flex items-center gap-3 p-4 bg-slate-900/50 border rounded-lg cursor-pointer hover:bg-slate-800 transition-colors group ${formData.experience === lvl ? "border-[#135bec]/30 ring-1 ring-[#135bec]/30" : "border-white/10"}`}
                    >
                      <input
                        className="w-5 h-5 text-[#135bec] bg-slate-800 border-white/20 focus:ring-[#135bec]"
                        name="experience"
                        type="radio"
                        value={lvl}
                        checked={formData.experience === lvl}
                        onChange={handleRadioChange}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{lvl === "beginner" ? "Pemula" : lvl === "intermediate" ? "Menengah" : "Mahir"}</span>
                        <span className="text-xs text-slate-500">{lvl === "beginner" ? "0 - 1 Tahun" : lvl === "intermediate" ? "1 - 3 Tahun" : "3+ Tahun"} pengalaman</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-white/10">
              <button
                onClick={() => router.back()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold text-slate-300 border border-white/10 hover:bg-white/5 transition-all "
                type="button"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span> Kembali
              </button>
              <button
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-12 py-3 rounded-lg font-bold text-white bg-[#135bec] hover:bg-[#135bec]/90 shadow-lg shadow-[#135bec]/20 transition-all  disabled:opacity-50"
                type="submit"
              >
                {loading ? "Menyimpan..." : "Lanjut Langkah 3"}
                {!loading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
              </button>
              
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
