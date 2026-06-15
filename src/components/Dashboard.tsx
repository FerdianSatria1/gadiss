import React, { useState } from "react";
import { GirlProfile } from "../types";
import { GIRL_PROFILES } from "../data";
import { Brain, Heart, Landmark, PlusCircle, Sparkles, Star, Zap, Trash2, ShieldAlert } from "lucide-react";

interface DashboardProps {
  walletBalance: number;
  onTopUp: (amount: number, message: string) => void;
  onSelectGirl: (girl: GirlProfile) => void;
  activeBookingsCount: number;
}

export default function Dashboard({
  walletBalance,
  onTopUp,
  onSelectGirl,
  activeBookingsCount
}: DashboardProps) {
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [funnyToast, setFunnyToast] = useState<string | null>(null);

  const moods = [
    { id: "all", label: "Semua Cewek Luar Biasa" },
    { id: "Skena", label: "Gadis Skena Jaksel" },
    { id: "Wibu", label: "Wibu Akut Onii-Chan" },
    { id: "Melankolis", label: "Overthinker Senggol Bacok" },
    { id: "Matre", label: "Matre Kelas Kakap" },
    { id: "Savage", label: "Tsundere Galak Marah" },
    { id: "Hemat", label: "Anak Kosan Sederhana" }
  ];

  const filteredGirls = GIRL_PROFILES.filter((girl) => {
    if (selectedMood === "all") return true;
    return girl.mood.toLowerCase().includes(selectedMood.toLowerCase());
  });

  const handleComedicTopUp = (amount: number, reason: string) => {
    onTopUp(amount, reason);
    setFunnyToast(`Sukses Top-Up! Rp ${amount.toLocaleString('id-ID')} IDH masuk ke dompet Anda karena: "${reason}"`);
    setTimeout(() => setFunnyToast(null), 4000);
  };

  return (
    <div className="space-y-8" id="dashboard-container">
      {/* Comedic Toast */}
      {funnyToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0a0a0a] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border-2 border-[#F27D26] animate-bounce active-glow">
          <Sparkles className="h-5 w-5 text-[#F27D26] fill-[#F27D26]" />
          <span className="text-sm font-medium">{funnyToast}</span>
        </div>
      )}

      {/* Warning parody notice */}
      <div className="bg-amber-500/10 border-l-4 border-[#F27D26] p-4 rounded-r-xl" id="safe-disclaimer">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ShieldAlert className="h-5 w-5 text-[#F27D26]" />
          </div>
          <div className="ml-3 text-left">
            <p className="text-xs text-[#F27D26] font-bold uppercase tracking-wider">
              Peringatan Kehaluan Tingkat Kompleks:
            </p>
            <p className="text-xs text-white/80 mt-1">
              Aplikasi ini adalah <strong>parodi komedi 100% bercanda (halu)</strong> untuk hiburan belaka.
              Seluruh tokoh fiktif, saldo Rupiah Halu (IDH) tidak bernilai nyata, dan chat ditenagai simulasi AI cerdas. 
              Dilarang baper, dilarang nangis di pojok kamar mandi kalau sewa habis!
            </p>
          </div>
        </div>
      </div>

      {/* Comedy Halu Stats & Top Up */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="stats-wallet-grid">
        {/* Wallet Display */}
        <div className="bg-gradient-to-tr from-[#140d04] to-[#271507] border border-[#F27D26]/40 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between h-48 active-glow">
          <div className="absolute right-[-10px] top-[-10px] text-white/5 opacity-5">
            <Landmark className="h-40 w-40" />
          </div>
          <div className="z-10">
            <div className="flex items-center justify-between text-[#F27D26] text-xs tracking-wider uppercase font-bold">
              <span>Kartu Debit Halu (IDH)</span>
              <span className="text-[10px] bg-[#F27D26]/20 border border-[#F27D26]/40 px-2.5 py-0.5 rounded-full text-white font-bold">Platinum Halu</span>
            </div>
            <div className="mt-4 text-left">
              <span className="text-xs text-white/50 block font-semibold uppercase tracking-wider">Saldo Anda saat ini:</span>
              <span className="text-3xl font-extrabold font-mono tracking-tight block mt-1 text-white glow-text">
                Rp {walletBalance.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          <div className="z-10 flex text-xs justify-between items-center text-white/40 font-mono">
            <span>CVV: 404 (Not Found)</span>
            <span>Active Rental: {activeBookingsCount} Gadis</span>
          </div>
        </div>

        {/* Funky Interactive Top Up */}
        <div className="glass rounded-3xl p-5 shadow-sm md:col-span-2 flex flex-col justify-between border-white/10 text-white">
          <div className="text-left">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PlusCircle className="h-4 w-4 text-[#F27D26]" />
              Top-Up Saldo Mandiri (Praktis & Halal)
            </h3>
            <p className="text-xs text-white/60 mt-1">
              Saldo habis saat PDKT-an virtual? Jangan panik, lakukan salah satu aksi heroik di bawah ini secara spiritual untuk asupan dana instan:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-left">
            <button
              onClick={() => handleComedicTopUp(500000, "Push Up 10x secara batiniah")}
              className="px-2 py-2.5 bg-white/5 text-[#F27D26] hover:bg-[#F27D26] hover:text-black hover:border-transparent text-[11px] font-bold rounded-xl border border-white/10 text-center transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              💪 Push Up spiritual (+500k)
            </button>
            <button
              onClick={() => handleComedicTopUp(1500000, "Minta maaf ke mantan lewat getaran doa")}
              className="px-2 py-2.5 bg-white/5 text-[#F27D26] hover:bg-[#F27D26] hover:text-black hover:border-transparent text-[11px] font-bold rounded-xl border border-white/10 text-center transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              🙏 Minta Maaf Mantan (+1.5M)
            </button>
            <button
              onClick={() => handleComedicTopUp(2500000, "Janji gak begadang scroll sosmed malam ini (bohong)")}
              className="px-2 py-2.5 bg-white/5 text-[#F27D26] hover:bg-[#F27D26] hover:text-black hover:border-transparent text-[11px] font-bold rounded-xl border border-white/10 text-center transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              🛌 Janji Gak Begadang (+2.5M)
            </button>
            <button
              onClick={() => handleComedicTopUp(5000000, "Tersenyum bangga di depan cermin")}
              className="px-2 py-2.5 bg-white/5 text-[#F27D26] hover:bg-[#F27D26] hover:text-black hover:border-transparent text-[11px] font-bold rounded-xl border border-white/10 text-center transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              😎 Puji Diri Ganteng (+5M)
            </button>
            <button
              onClick={() => handleComedicTopUp(100000, "Kerja rodi virtual (KLIK MAKSIMAL!)")}
              className="px-2 py-2.5 bg-white/5 text-[#F27D26] hover:bg-[#F27D26] hover:text-black hover:border-transparent text-[11px] font-bold rounded-xl border border-white/10 text-center transition-all hover:scale-[1.02] active:scale-95 col-span-2 sm:col-span-1 cursor-pointer"
            >
              🖱️ Kerja Klik Fiktif (+100k)
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Profiles Selection Grid */}
      <div className="space-y-6 text-left" id="profiles-selection-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
              <span className="w-1.5 h-6 bg-[#F27D26] rounded-full inline-block"></span>
              Pilih Companion Gadis Idaman Anda:
            </h2>
            <p className="text-xs text-white/50">Temukan kepribadian unik dari ratusan menit kehaluan tak terbatas</p>
          </div>
          {/* Active stats badge */}
          <div className="text-[11px] py-1 px-3 bg-[#F27D26]/10 border border-[#F27D26]/30 text-[#F27D26] rounded-full inline-flex self-start sm:self-auto items-center gap-1.5 font-bold shadow-[0_0_15px_rgba(242,125,38,0.1)]">
            <span className="h-2 w-2 rounded-full bg-[#F27D26] animate-ping" />
            1,402 Jomblo Sedang Rental Online
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" id="mood-filtration-chips">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m.id)}
              className={`px-4 py-2 text-xs font-bold rounded-full shrink-0 transition-all cursor-pointer ${
                selectedMood === m.id
                  ? "bg-[#F27D26] text-black shadow-lg shadow-[#F27D26]/35"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Girls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="girls-catalog-grid">
          {filteredGirls.map((girl) => (
            <div
              key={girl.id}
              className="glass rounded-3xl overflow-hidden shadow-2xl hover:active-glow hover:scale-[1.01] transition-all duration-300 group flex flex-col h-full"
            >
              {/* Card Banner / Type */}
              <div className={`h-32 ${girl.avatar} relative p-4 flex flex-col justify-between text-white`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <span className="text-[10px] bg-black/40 backdrop-blur-md text-white px-2.5 py-1 rounded-full uppercase tracking-wider font-bold self-start border border-white/10 relative z-10">
                  🌟 {girl.mood}
                </span>
                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight drop-shadow-md">{girl.name}</h3>
                    <p className="text-xs text-white/90 drop-shadow-sm">{girl.age} Tahun</p>
                  </div>
                  <span className="text-[10px] bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold px-2 py-0.5 rounded-full">
                    SFW Certified
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-xs text-white/60 leading-relaxed italic line-clamp-2">
                    &ldquo;{girl.description}&rdquo;
                  </p>

                  {/* Catchphrase preview */}
                  <div className="bg-[#F27D26]/10 p-2.5 rounded-xl border-l-2 border-[#F27D26]">
                    <p className="text-[11px] font-bold text-[#F27D26] line-clamp-1 italic">
                      &ldquo;{girl.catchphrases[0]}&rdquo;
                    </p>
                  </div>

                  {/* Custom Stats Bar */}
                  <div className="space-y-2 text-[10px] text-white/50 border-t border-white/5 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-red-500 fill-red-500" /> Kemanisan (Charm)</span>
                      <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#F27D26] h-full rounded-full" style={{ width: `${girl.stats.charm}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-amber-500 fill-amber-500" /> Tingkat Kesantaian</span>
                      <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${girl.stats.chillRate}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1"><Brain className="h-3 w-3 text-indigo-400 fill-indigo-400" /> Ketuntasan Cerewet</span>
                      <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${girl.stats.demands}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer and Price action */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between text-left">
                  <div>
                    <span className="text-[10px] uppercase text-white/40 block tracking-wider font-semibold">Tarif Sewa</span>
                    <span className="text-sm font-extrabold text-[#F27D26] font-mono glow-text">
                      Rp {girl.pricePerDay.toLocaleString('id-ID')} <span className="text-[10px] font-normal text-white/50">/hari</span>
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectGirl(girl)}
                    className="px-4 py-2 bg-[#F27D26] hover:bg-[#ff8a38] active:scale-95 text-xs text-black font-extrabold rounded-xl shadow-lg shadow-[#F27D26]/20 transition-all cursor-pointer"
                  >
                    Sewa Sekarang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
