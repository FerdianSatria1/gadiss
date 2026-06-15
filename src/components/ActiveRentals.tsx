import React, { useState, useRef, useEffect } from "react";
import { ActiveBooking, GiftItem, Message, GirlProfile } from "../types";
import { GIRL_PROFILES, GIFT_ITEMS } from "../data";
import { Send, Gift, Heart, Trash2, HelpCircle, Smile, Sparkles, MapPin, Coffee, AlertCircle } from "lucide-react";

interface ActiveRentalsProps {
  bookings: ActiveBooking[];
  onSendMessage: (bookingId: string, text: string) => void;
  onSendGift: (bookingId: string, gift: GiftItem) => void;
  onCancelBooking: (bookingId: string) => void;
  walletBalance: number;
}

export default function ActiveRentals({
  bookings,
  onSendMessage,
  onSendGift,
  onCancelBooking,
  walletBalance
}: ActiveRentalsProps) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    bookings.length > 0 ? bookings[0].id : null
  );
  const [inputText, setInputText] = useState("");
  const [showGiftShop, setShowGiftShop] = useState(false);
  const [giftError, setGiftError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set default active booking if none selected but list is not empty
  useEffect(() => {
    if (bookings.length > 0 && (!selectedBookingId || !bookings.find(b => b.id === selectedBookingId))) {
      setSelectedBookingId(bookings[0].id);
    }
  }, [bookings, selectedBookingId]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedBookingId, bookings]);

  const activeBooking = bookings.find((b) => b.id === selectedBookingId);
  const associatedProfile = activeBooking
    ? GIRL_PROFILES.find((g) => g.id === activeBooking.girlId)
    : null;

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedBookingId) return;

    onSendMessage(selectedBookingId, inputText.trim());
    setInputText("");

    // Simulate short Typing delay for a premium chat look
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const handleSelectGift = (gift: GiftItem) => {
    if (gift.cost > walletBalance) {
      setGiftError("Saldo Halu tidak cukup untuk membeli kado mewah ini! Cari kado murah atau top up gratis di Dashboard!");
      setTimeout(() => setGiftError(null), 4000);
      return;
    }
    if (!selectedBookingId) return;

    onSendGift(selectedBookingId, gift);
    setShowGiftShop(false);
  };

  if (bookings.length === 0) {
    return (
      <div className="glass rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-2xl relative" id="empty-rentals-state">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a110a]/40 to-[#0e0c0a]/40 rounded-3xl pointer-events-none -z-10" />
        <div className="text-5xl text-[#F27D26] glow-text animate-pulse">💔</div>
        <h3 className="text-lg font-bold text-white">Tidak ada Kencan Virtual Aktif</h3>
        <p className="text-xs text-white/60 leading-relaxed">
          Dompet Anda penuh tapi hati Anda sepi seperti peron stasiun tengah malam? 
          Wah gawat! Pergilah ke Dashboard, pilih salah satu cewek halu idaman Anda, klik Sewa Sekarang sebelum masa muda terbuang sia-sia!
        </p>
      </div>
    );
  }

  // Get progress percentage (mock) of Affection Level
  const getAffectionColor = (lvl: number) => {
    if (lvl < 30) return { bg: "bg-white/30", text: "text-white/50", label: "Dingin seperti es batu" };
    if (lvl < 60) return { bg: "bg-amber-400", text: "text-amber-400", label: "Mulai Salah Tingkah" };
    if (lvl < 85) return { bg: "bg-[#F27D26]", text: "text-[#F27D26]", label: "Sayang Banget Virtual" };
    return { bg: "bg-red-500", text: "text-red-500", label: "Cinta Mati Haluku" };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left" id="active-rentals-container">
      
      {/* 1. Left List panel - active girl sessions */}
      <div className="space-y-3 lg:col-span-1">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">
          Daftar Sewaan Aktif ({bookings.length})
        </h3>
        
        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {bookings.map((booking) => {
            const isSelected = booking.id === selectedBookingId;
            const lastMsg = booking.chatHistory[booking.chatHistory.length - 1];

            return (
              <div
                key={booking.id}
                onClick={() => setSelectedBookingId(booking.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex items-center justify-between group ${
                  isSelected
                    ? "border-[#F27D26] bg-[#F27D26]/10 shadow-[0_0_15px_rgba(242,125,38,0.25)]"
                    : "border-white/5 bg-white/5 hover:bg-white/10"
                }`}
              >
                {/* Active Indicator dots */}
                <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F27D26] rounded-r opacity-0 group-hover:opacity-100 transition-all" />

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${booking.girlAvatar} flex items-center justify-center text-white font-extrabold text-sm shadow-md relative z-10`}>
                    {booking.girlName[0]}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      {booking.girlName}
                      <span className="text-[9px] bg-[#F27D26]/10 text-[#F27D26] px-1.5 py-0.5 rounded-full font-bold">
                        ❤️ {booking.affectionLevel}%
                      </span>
                    </h4>
                    <p className="text-[10px] text-white/50 truncate max-w-[130px]">
                      {lastMsg ? lastMsg.text : "Belum mulai PDKT..."}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] block text-[#F27D26] bg-[#F27D26]/10 border border-[#F27D26]/30 px-2 py-0.5 rounded-full font-bold max-w-fit ml-auto">
                    Active
                  </span>
                  <span className="text-[9px] text-white/40 block mt-1 font-mono">
                    {booking.days} hari
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Middle & Right Area - Selected Chat & Profile Simulator */}
      {activeBooking && (
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-5 bg-[#070707]/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-[500px] glass">
          
          {/* Chat Panel (Col-span 3) */}
          <div className="md:col-span-3 border-r border-white/5 flex flex-col justify-between h-[520px]">
            
            {/* Chat Header */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${activeBooking.girlAvatar} flex items-center justify-center text-white text-xs font-bold shadow`}>
                  {activeBooking.girlName[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{activeBooking.girlName}</h4>
                  <p className="text-[9px] text-[#F27D26] font-bold flex items-center gap-1 tracking-wide">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F27D26] animate-ping" />
                    Sedang dengerin ceritamu...
                  </p>
                </div>
              </div>

              {/* Comedic location tracking */}
              <div className="text-[9px] bg-[#F27D26]/10 border border-[#F27D26]/30 px-2.5 py-1 rounded-xl text-[#F27D26] font-bold max-w-[150px] truncate">
                📍 {activeBooking.locationName}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-black/20">
              {/* Service rental system initial message banner */}
              <div className="p-3 bg-amber-550/10 border border-[#F27D26]/30 rounded-2xl text-[10px] text-[#F27D26] leading-normal font-sans">
                🤖 <strong>Pemberitahuan Operator Halu:</strong> Anda telah berhasil menyewa {activeBooking.girlName} dengan 
                paket <strong>{activeBooking.packageName}</strong>. Kirimkan pesan atau berikan kado virtual dari Tombol Kado untuk meluluhkan hatinya!
              </div>

              {activeBooking.chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : msg.sender === "system" ? "justify-center" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                      msg.sender === "user"
                        ? "bg-[#F27D26] text-black font-extrabold rounded-tr-none shadow-md shadow-[#F27D26]/15"
                        : msg.sender === "system"
                        ? "bg-white/5 text-white/50 text-[10px] italic border border-white/5"
                        : "bg-white/10 text-white border border-white/10 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`text-[8px] block mt-1 text-right ${
                        msg.sender === "user" ? "text-black/60 font-semibold" : "text-white/40"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm text-xs text-white/60 flex items-center gap-1">
                    <span className="animate-bounce delay-100 font-bold font-mono">.</span>
                    <span className="animate-bounce delay-200 font-bold font-mono">.</span>
                    <span className="animate-bounce delay-300 font-bold font-mono">.</span>
                    <span className="text-[10px] ml-1">menulis balasan lucu</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Action Input */}
            <form onSubmit={handleSendText} className="p-3 bg-white/5 border-t border-white/5 flex items-center gap-2 relative">
              <button
                type="button"
                onClick={() => setShowGiftShop(!showGiftShop)}
                className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center border ${
                  showGiftShop
                    ? "bg-[#F27D26] text-black border-[#F27D26]"
                    : "bg-white/5 border-white/10 text-[#F27D26] hover:bg-white/10"
                }`}
                title="Beli & Kirim Kado Mewah Halu"
              >
                <Gift className="h-5 w-5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Rayu ${activeBooking.girlName} di sini...`}
                className="flex-1 border border-white/10 outline-none p-2.5 rounded-xl text-xs bg-black/40 text-white placeholder-white/35 focus:border-[#F27D26] transition-all font-medium"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 bg-[#F27D26] hover:bg-[#ff8a38] disabled:bg-white/10 disabled:text-white/30 text-black font-bold rounded-xl transition-all flex items-center justify-center cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>

              {/* Gift shop Popover overlay dropdown */}
              {showGiftShop && (
                <div className="absolute left-3 bottom-16 right-3 bg-black border border-white/10 rounded-2xl p-4 shadow-2xl z-20 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      🎁 Toko Kado Sejahtera Halu
                    </h4>
                    <span className="text-[10px] font-bold text-[#F27D26] font-mono glow-text">
                      Saldo: Rp {walletBalance.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {giftError && (
                    <p className="text-[10px] text-red-400 font-bold bg-white/5 border border-red-500/30 p-2 rounded-lg">
                      {giftError}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {GIFT_ITEMS.map((gift) => (
                      <div
                        key={gift.id}
                        onClick={() => handleSelectGift(gift)}
                        className="p-2 border border-white/5 hover:border-[#F27D26] hover:bg-white/5 rounded-xl cursor-pointer transition-all flex items-center gap-2 text-left"
                      >
                        <span className="text-xl">{gift.icon}</span>
                        <div className="text-left leading-tight">
                          <span className="text-[10px] font-bold text-white block">{gift.name}</span>
                          <span className="text-[9px] text-[#F27D26] font-semibold block">Bonus ❤️ +{gift.affectionBonus}</span>
                          <span className="text-[9px] text-white/40 font-mono block">Rp {gift.cost.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Persona Detail Side Panel (Col-span 2) */}
          <div className="md:col-span-2 bg-[#140d04]/20 p-5 flex flex-col justify-between space-y-5 h-[520px]">
            <div className="space-y-4 overflow-y-auto scrollbar-none">
              
              {/* Tiny Avatar Info */}
              <div className="text-center space-y-1.5 pt-2">
                <span className="text-xs font-bold text-[#F27D26] uppercase tracking-widest block glow-text">PROFIL COMPANION</span>
                <h4 className="text-md font-extrabold text-white">{activeBooking.girlName}</h4>
                <p className="text-[10px] bg-[#F27D26]/10 border border-[#F27D26]/30 py-1 px-3 rounded-full text-[#F27D26] font-bold inline-block">
                  🎯 {associatedProfile?.mood || activeBooking.packageName}
                </p>
              </div>

              {/* Affection Progress gauge */}
              <div className="space-y-1.5 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center text-[10px] font-bold text-white/60">
                  <span className="flex items-center gap-0.5"><Heart className="h-3 w-3 text-[#F27D26] fill-[#F27D26]" /> Ketinggian Rasa Sayang</span>
                  <span className="text-[#F27D26] font-mono font-bold glow-text">{activeBooking.affectionLevel}%</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`${getAffectionColor(activeBooking.affectionLevel).bg} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${activeBooking.affectionLevel}%` }}
                  />
                </div>
                <p className="text-[9px] italic text-white/50 text-center">
                  Status: &ldquo;{getAffectionColor(activeBooking.affectionLevel).label}&rdquo;
                </p>
              </div>

              {/* Dynamic checklist like/dislikes */}
              {associatedProfile && (
                <div className="space-y-3 bg-white/5 p-3.5 rounded-2xl border border-white/5 text-[10px]">
                  <div>
                    <span className="font-bold text-[#F27D26] block mb-1">👍 Sangat disukai:</span>
                    <ul className="list-disc list-inside text-white/60 space-y-0.5 pl-1">
                      {associatedProfile.likes.map((l, i) => <li key={i}>{l}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-red-400 block mb-1">👎 Paling dibenci:</span>
                    <ul className="list-disc list-inside text-white/60 space-y-0.5 pl-1">
                      {associatedProfile.dislikes.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Breakup / Stop Rental with funny disclaimer */}
            <div className="border-t border-white/5 pt-3">
              <button
                onClick={() => onCancelBooking(activeBooking.id)}
                className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 active:scale-95 text-[10px] text-red-400 font-bold rounded-xl transition-all cursor-pointer border border-red-500/30 flex items-center justify-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Putusin & Batalkan Sewa (Ambil Refund)
              </button>
              <p className="text-[8px] text-white/40 text-center mt-1">
                *Mengembalikan 100% saldo Rupiah Halu Anda. Putus damai tanpa drama sidang.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
