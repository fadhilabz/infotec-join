"use client";

import React from "react";
import Link from "next/link";
import Script from 'next/script';

import "./globals.css";

export default function LandingPage() {
  // Fungsi untuk scroll otomatis ke section pendaftaran
  const scrollToRegister = () => {
    const element = document.getElementById("pendaftaran-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#101622] text-slate-100 selection:bg-primary/30">
      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-32 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Batch 2026 Telah Dibuka
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Wujudkan Ide Startup <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Bersama UKM START UP Infotec Milenial</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Komunitas inkubator teknologi untuk mahasiswa kreatif. Kami membantu kamu belajar, berkolaborasi, dan membangun produk nyata.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToRegister}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
            >
              Daftar Sekarang
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- LIST KEUNTUNGAN (FEATURE SECTION) --- */}
      <section className="py-24 px-6 lg:px-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Kenapa Harus Bergabung?</h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div key={index} className="glass-effect p-8 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors group">
                <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FORM REGISTRASI SECTION --- */}
      <section id="pendaftaran-section" className="py-24 px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4">Siap untuk Memulai?</h2>
          <p className="text-slate-400">Isi data di bawah ini untuk memulai perjalananmu.</p>
        </div>

        {/* Kotak Form (Panggil Komponen Register kamu di sini) */}
        <div className="w-full max-w-2xl glass-effect rounded-3xl p-1 shadow-2xl overflow-hidden">
          <div className="bg-[#101622]/80 p-8 rounded-[22px]">
            {/* Di sini kamu bisa memasukkan logika form yang sebelumnya sudah dibuat */}
            <div className="flex flex-col items-center py-10 text-center">
              <span className="material-symbols-outlined text-6xl text-blue-500 mb-4 animate-bounce">person_add</span>
              <h3 className="text-2xl font-bold text-white mb-6">Mulai Form Pendaftaran</h3>
              <Link href="/daftar" className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-black text-lg hover:scale-105 transition-transform">
                BUKA FORMULIR
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="ad-container my-4">
          <Script strategy="afterInteractive" data-cfasync="false" src="https://pl28738715.effectivegatecpm.com/7d708169ec177c6d1417b39295610003/invoke.js"></Script>
          <div id="container-7d708169ec177c6d1417b39295610003"></div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-10 text-center border-t border-white/5 text-slate-500 text-sm">
        <p>© 2026 UKM START UP Infotec Milenial. Made with 💙 by Fadhil Abbas.</p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "groups",
    title: "Networking",
    desc: "Terhubung dengan ratusan mahasiswa dari Teknik Informatika.",
  },
  {
    icon: "code",
    title: "Project-Based",
    desc: "Belajar coding, design, dan marketing langsung lewat proyek startup yang nyata.",
  },
  {
    icon: "psychology",
    title: "Mentorship",
    desc: "Dibimbing langsung oleh praktisi industri yang sudah berpengalaman di dunia tech.",
  },
];
