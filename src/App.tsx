/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { GirlProfile, ActiveBooking, GiftItem, Message, FakeReview } from "./types";
import { GIRL_PROFILES } from "./data";
import Dashboard from "./components/Dashboard";
import BookingModal from "./components/BookingModal";
import ActiveRentals from "./components/ActiveRentals";
import ReviewList from "./components/ReviewList";
import { Heart, Info, Landmark, MessageCircle, Sparkles, User, HelpCircle, ShieldAlert } from "lucide-react";

export default function App() {
  const [walletBalance, setWalletBalance] = useState<number>(3500000); // 3.5 Million Halu Rupiah (IDH)
  const [activeTab, setActiveTab] = useState<"explore" | "rentals" | "reviews">("explore");
  const [selectedGirl, setSelectedGirl] = useState<GirlProfile | null>(null);
  
  // Set a pre-filled funny default booking that is active so the user can test chat instantly
  const [bookings, setBookings] = useState<ActiveBooking[]>([
    {
      id: "b-default",
      girlId: "g2",
      girlName: "Yuki Kawaii",
      girlAvatar: "bg-rose-400",
      packageName: "Paket Mabar Genshin/ML Malam Minggu",
      locationName: "Batas Dimensi Halu (Discord Call 24 Jam)",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      days: 3,
      totalCost: 280000,
      affectionLevel: 55,
      status: "active",
      chatHistory: [
        {
          id: "m1",
          sender: "girl",
          text: "Konichiwa Onii-chan! (≧∇≦)/ Makasih ya udah sewa ku lewat Paket Mabar! Watashi seneng banget deh bebas ngobrol sama kamu. Kita mabar game gacha apa malam minggu ini?",
          timestamp: "Sekarang"
        }
      ]
    }
  ]);

  const handleTopUp = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
  };

  const handleSelectGirl = (girl: GirlProfile) => {
    setSelectedGirl(girl);
  };

  const handleConfirmBooking = (config: Omit<ActiveBooking, "id" | "affectionLevel" | "chatHistory" | "status">) => {
    const newBooking: ActiveBooking = {
      ...config,
      id: `b-${Date.now()}`,
      affectionLevel: 30, // Start base fondness
      status: "active",
      chatHistory: [
        {
          id: `m-init-${Date.now()}`,
          sender: "girl",
          text: `Halo mas penyewa ganteng! Makasih ya udah pilih aku buat nemenin di "${config.locationName}". Yuk langsung chat aku dan jangan lupa kasih sapaan paling manis mu! 😉`,
          timestamp: "Baru saja"
        }
      ]
    };

    setBookings([newBooking, ...bookings]);
    setWalletBalance((prev) => prev - config.totalCost);
    setSelectedGirl(null);
    setActiveTab("rentals"); // Redirect instantly to active chats
  };

  const handleSendMessage = async (bookingId: string, text: string) => {
    // 1. Add User Message
    const timestampStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: `mu-${Date.now()}`,
      sender: "user",
      text,
      timestamp: timestampStr
    };

    // Update locally preserving state
    let targetBooking: ActiveBooking | undefined;
    
    setBookings((prevBookings) =>
      prevBookings.map((b) => {
        if (b.id === bookingId) {
          const updatedChat = [...b.chatHistory, userMsg];
          const newAffection = Math.min(b.affectionLevel + 3, 100); // +3% fondness per message
          targetBooking = { ...b, chatHistory: updatedChat, affectionLevel: newAffection };
          return targetBooking;
        }
        return b;
      })
    );

    if (!targetBooking) return;

    // 2. Fetch parody AI response from back-end server via standard route
    const currentGirlProfile = GIRL_PROFILES.find((g) => g.id === targetBooking?.girlId);
    
    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: targetBooking.chatHistory,
          girlProfile: {
            ...currentGirlProfile,
            moodId: targetBooking.girlId === "g1" ? "skena" :
                    targetBooking.girlId === "g2" ? "wibu" :
                    targetBooking.girlId === "g3" ? "overthinking" :
                    targetBooking.girlId === "g4" ? "matre" :
                    targetBooking.girlId === "g5" ? "galak" : "kosan"
          }
        })
      });

      const data = await response.json();
      
      const aiResponseMsg: Message = {
        id: `mg-${Date.now()}`,
        sender: "girl",
        text: data.reply || "Maaf ya beb sinyal cinta ku mendadak blank/loading... chat lagi dong!",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };

      setBookings((prevBookings) =>
        prevBookings.map((b) => {
          if (b.id === bookingId) {
            return {
              ...b,
              chatHistory: [...b.chatHistory, aiResponseMsg]
            };
          }
          return b;
        })
      );
    } catch (e) {
      console.error("AI Fetch Failure:", e);
    }
  };

  const handleSendGift = async (bookingId: string, gift: GiftItem) => {
    const timestampStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    
    // 1. Add gift sent event log
    const systemGiftMsg: Message = {
      id: `ms-gift-${Date.now()}`,
      sender: "system",
      text: `🎁 Mengirimkan kado spesial: "${gift.name}" (${gift.description})`,
      timestamp: timestampStr
    };

    let targetBooking: ActiveBooking | undefined;

    setBookings((prevBookings) =>
      prevBookings.map((b) => {
        if (b.id === bookingId) {
          const updatedChat = [...b.chatHistory, systemGiftMsg];
          const calculatedAffection = Math.min(b.affectionLevel + gift.affectionBonus, 100);
          targetBooking = { ...b, chatHistory: updatedChat, affectionLevel: calculatedAffection };
          return targetBooking;
        }
        return b;
      })
    );

    // Deduct wallet fiktif
    setWalletBalance((prev) => prev - gift.cost);

    if (!targetBooking) return;

    // 2. Fetch hilarious API reactions
    const currentGirlProfile = GIRL_PROFILES.find((g) => g.id === targetBooking?.girlId);
    
    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: targetBooking.chatHistory,
          girlProfile: {
            ...currentGirlProfile,
            moodId: targetBooking.girlId === "g1" ? "skena" :
                    targetBooking.girlId === "g2" ? "wibu" :
                    targetBooking.girlId === "g3" ? "overthinking" :
                    targetBooking.girlId === "g4" ? "matre" :
                    targetBooking.girlId === "g5" ? "galak" : "kosan"
          },
          giftSent: gift
        })
      });

      const data = await response.json();
      
      const giftReplyMsg: Message = {
        id: `mg-gift-${Date.now()}`,
        sender: "girl",
        text: data.reply || `[Menerima Kado: ${gift.name}] "Makasih banyak beb buat kadonya! ${gift.funnyReply}"`,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };

      setBookings((prevBookings) =>
        prevBookings.map((b) => {
          if (b.id === bookingId) {
            return {
              ...b,
              chatHistory: [...b.chatHistory, giftReplyMsg]
            };
          }
          return b;
        })
      );
    } catch (e) {
      console.error("Gift Reaction Failure:", e);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    const bookingToCancel = bookings.find((b) => b.id === bookingId);
    if (!bookingToCancel) return;

    // Refund fiktif
    setWalletBalance((prev) => prev + bookingToCancel.totalCost);
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#080808] to-[#120a05] text-[#e0e0e0] flex flex-col justify-between" id="app-wrapper">
      {/* 1. Header */}
      <header className="bg-black/60 backdrop-blur-md sticky top-0 z-40 border-b border-white/10" id="app-header">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Brand slogan */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-tr from-[#F27D26] to-[#ff4e00] rounded-2xl flex items-center justify-center shadow-lg shadow-[#F27D26]/25">
              <Heart className="h-5 w-5 text-black fill-black" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-white">
                GADIS<span className="text-[#F27D26]">.</span>RENT
              </h1>
              <p className="text-[10px] text-white/50 font-semibold uppercase tracking-wider">Jasa Parodi Sewa Companion Virtual</p>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-2xl" id="nav-tabs">
            <button
              onClick={() => setActiveTab("explore")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "explore"
                  ? "bg-[#F27D26] text-black shadow-[0_0_15px_rgba(242,125,38,0.4)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Explore Gadis
            </button>
            <button
              onClick={() => setActiveTab("rentals")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer relative ${
                activeTab === "rentals"
                  ? "bg-[#F27D26] text-black shadow-[0_0_15px_rgba(242,125,38,0.4)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Sewa Aktif (Chat)
              {bookings.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] h-4 w-4 rounded-full flex items-center justify-center font-extrabold animate-pulse">
                  {bookings.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "reviews"
                  ? "bg-[#F27D26] text-black shadow-[0_0_15px_rgba(242,125,38,0.4)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Kesan Halu
            </button>
          </div>

          {/* Wallet Mini widget */}
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-2xl">
            <Landmark className="h-4 w-4 text-[#F27D26]" />
            <div className="text-left">
              <span className="text-[8px] text-white/40 block font-semibold uppercase leading-none">Dompet Halu</span>
              <span className="text-xs font-extrabold text-[#F27D26] font-mono tracking-tight glow-text">
                Rp {walletBalance.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Content Canvas */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full" id="inner-canvas">
        {activeTab === "explore" && (
          <Dashboard
            walletBalance={walletBalance}
            onTopUp={handleTopUp}
            onSelectGirl={handleSelectGirl}
            activeBookingsCount={bookings.length}
          />
        )}

        {activeTab === "rentals" && (
          <ActiveRentals
            bookings={bookings}
            onSendMessage={handleSendMessage}
            onSendGift={handleSendGift}
            onCancelBooking={handleCancelBooking}
            walletBalance={walletBalance}
          />
        )}

        {activeTab === "reviews" && (
          <ReviewList
            onAddReview={() => {}}
          />
        )}
      </main>

      {/* 3. Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-6" id="app-footer-node">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
          <p className="text-xs text-white/40">
            &copy; 2026 GADIS.RENT fiktif. Seluruh nama, kencan, dan kado di dalam platform ini adalah buatan belaka (parodi).
          </p>
          <div className="flex justify-center gap-4 text-[10px] text-white/50 font-semibold uppercase">
            <span className="hover:text-[#F27D26] cursor-pointer transition-colors">Syarat & Ketentuan Halu</span>
            <span>&bull;</span>
            <span className="hover:text-[#F27D26] cursor-pointer transition-colors">Buku Panduan Jomblo Mandiri</span>
            <span>&bull;</span>
            <span className="hover:text-[#F27D26] cursor-pointer transition-colors">Hubungi Operator (Komedi)</span>
          </div>
        </div>
      </footer>

      {/* Booking Configurator Modal Overlay */}
      {selectedGirl && (
        <BookingModal
          girl={selectedGirl}
          walletBalance={walletBalance}
          onClose={() => setSelectedGirl(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}
    </div>
  );
}
