"use client";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 glass-card border-b border-white/5 px-6 lg:px-20 py-4 flex items-center justify-between bg-[#101622]/50 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="bg-[#135bec] p-1.5 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          UKM START UP  <span className="text-[#135bec]"> Infotec Milenial</span>
        </h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="bg-[#135bec] hover:bg-[#135bec]/90 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-[#135bec]/20">
          Daftar Sekarang
        </button>
      </div>
    </header>
  );
}