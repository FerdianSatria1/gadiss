import React, { useState } from "react";
import { GirlProfile, DatingPackage, ActiveBooking } from "../types";
import { DATING_PACKAGES } from "../data";
import { Calendar, Check, DollarSign, Gem, MapPin, Sparkles, X } from "lucide-react";

interface BookingModalProps {
  girl: GirlProfile;
  walletBalance: number;
  onClose: () => void;
  onConfirmBooking: (booking: Omit<ActiveBooking, "id" | "affectionLevel" | "chatHistory" | "status">) => void;
}

export const COMMEDIC_LOCATIONS = [
  "Blok M Jakarta (Pasar Estetik & Kopi Arang)",
  "Pinggir Got Margonda Depok (Menghirup asep angkot)",
  "Seblak Mercon Bu RT Ciledug (Lambung Berdarah)",
  "Senayan City Mall VIP (Dilarang pakai sendal jepit)",
  "Kos-Kosan Fitri (Ngerebus mie dobel telor)",
  "Stasiun Manggarai Peron 3 (Saling desak-desakan romantis)"
];

export default function BookingModal({
  girl,
  walletBalance,
  onClose,
  onConfirmBooking
}: BookingModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<DatingPackage>(DATING_PACKAGES[0]);
  const [selectedLocation, setSelectedLocation] = useState<string>(COMMEDIC_LOCATIONS[0]);
  const [durationDays, setDurationDays] = useState<number>(3);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Bill calculations based on base rate * duration days * multiplier
  const baseRate = girl.pricePerDay;
  const packageMultiplier = selectedPackage.durationCostMultiplier;
  const totalCost = Math.round(baseRate * durationDays * packageMultiplier);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalCost > walletBalance) {
      setErrorText("Peringatan Kehaluan Maksimal: Saldo dompet fiktif Anda tidak cukup! Silakan top-up dulu gratis di Dashboard dengan push-up/minta maaf mantan!");
      return;
    }

    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + durationDays);

    onConfirmBooking({
      girlId: girl.id,
      girlName: girl.name,
      girlAvatar: girl.avatar,
      packageName: selectedPackage.name,
      locationName: selectedLocation,
      startDate: today.toISOString().split("T")[0],
      endDate: futureDate.toISOString().split("T")[0],
      days: durationDays,
      totalCost: totalCost
    });
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#0a0a0a] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10 flex flex-col justify-between glass">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${girl.avatar} animate-pulse`} />
            <div>
              <h2 className="text-xl font-bold text-white">Sewa {girl.name}</h2>
              <p className="text-xs text-[#F27D26] font-bold uppercase tracking-wider">{girl.mood}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 text-left">
          {/* Base Tarif info banner */}
          <div className="bg-[#F27D26]/10 border border-[#F27D26]/30 p-4 rounded-2xl flex items-center justify-between text-white">
            <div className="text-left">
              <span className="text-xs font-semibold block uppercase text-white/50 tracking-wider">Tarif Dasar Virtual</span>
              <span className="text-lg font-bold font-mono text-[#F27D26] glow-text">Rp {girl.pricePerDay.toLocaleString('id-ID')} / hari</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold block uppercase text-white/50 tracking-wider">Saldo Dompet Anda</span>
              <span className="text-md font-bold font-mono text-emerald-400">Rp {walletBalance.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* 1. Choose Comedic Dating Package */}
          <div className="space-y-3 text-left">
            <label className="text-xs font-bold text-white/55 uppercase tracking-wider flex items-center gap-1.5">
              <Gem className="h-4 w-4 text-[#F27D26]" />
              1. Pilih Paket Kencan Halu:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {DATING_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`border p-3.5 rounded-2xl cursor-pointer transition-all flex flex-col justify-between h-28 ${
                    selectedPackage.id === pkg.id
                      ? "border-[#F27D26] bg-[#F27D26]/10 shadow-[0_0_15px_rgba(242,125,38,0.25)]"
                      : "border-white/5 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white block">{pkg.name}</span>
                    {selectedPackage.id === pkg.id && (
                      <span className="h-5 w-5 bg-[#F27D26] text-black rounded-full flex items-center justify-center text-[10px]">
                        <Check className="h-3 w-3 stroke-[3px]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-white/55 mt-1 line-clamp-2 leading-tight">
                    {pkg.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] pt-2 border-t border-white/5 mt-1">
                    <span className="text-[#F27D26] font-bold">Bonus Affection +{pkg.perDatingPointBonuses}</span>
                    <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-semibold">
                      x{pkg.durationCostMultiplier} Tarif
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Select Location */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-white/55 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-400" />
              2. Lokasi Kencan Fiktif:
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full border border-white/10 outline-none p-3.5 rounded-2xl text-xs bg-[#0c0c0c] text-white font-semibold focus:border-[#F27D26] shadow-sm"
            >
              {COMMEDIC_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  📍 {loc}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Duration slider */}
          <div className="space-y-2 text-left">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#F27D26]" />
                3. Durasi PDKT Sewaan:
              </label>
              <span className="text-xs font-bold text-[#F27D26] font-mono bg-[#F27D26]/10 px-2.5 py-1 rounded-full glow-text">
                {durationDays} Hari Kebersamaan
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="14"
              value={durationDays}
              onChange={(e) => {
                setDurationDays(parseInt(e.target.value));
                setErrorText(null);
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/15 accent-[#F27D26]"
            />
            <div className="flex justify-between text-[9px] text-white/40 font-bold px-1">
              <span>1 Hari (PDKT Kilat)</span>
              <span>7 Hari (Sayang Virtual)</span>
              <span>14 Hari (Menuju Pernikahan Halu)</span>
            </div>
          </div>

          {/* Billing Estimate Summary */}
          <div className="bg-white/5 p-4 rounded-2xl space-y-2.5 border border-white/5 text-left">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Kalkulasi Tagihan (IDH)</h4>
            <div className="flex justify-between text-xs font-medium text-white/70">
              <span>Tarif {girl.name} ({durationDays} hari)</span>
              <span className="font-mono text-white/90">Rp {(baseRate * durationDays).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-white/70">
              <span>Biaya Layanan {selectedPackage.name}</span>
              <span className="font-mono text-white/90">x {selectedPackage.durationCostMultiplier}</span>
            </div>
            <div className="border-t border-dashed border-white/10 my-2 pt-2 flex justify-between items-center text-sm">
              <span className="font-bold text-white">Total Biaya Halu</span>
              <span className="font-extrabold text-[#F27D26] font-mono text-base glow-text">
                Rp {totalCost.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {errorText && (
            <p className="text-xs text-red-400 font-bold text-center bg-red-500/10 p-3 rounded-xl border border-red-500/35 flex items-center gap-1.5 justify-center">
              ⚠ {errorText}
            </p>
          )}

          {/* Config actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-xs bg-white/5 hover:bg-white/10 active:scale-95 text-white/80 font-bold rounded-xl transition-all cursor-pointer border border-white/10"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-xs bg-[#F27D26] hover:bg-[#ff8a38] active:scale-95 text-black font-extrabold rounded-xl shadow-lg shadow-[#F27D26]/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 fill-black" />
              Konfirmasi Sewa Halu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
