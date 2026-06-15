import React, { useState } from "react";
import { FakeReview } from "../types";
import { FAKE_REVIEWS } from "../data";
import { Star, MessageSquare, Plus, ThumbsUp, Sparkles, User, HelpCircle } from "lucide-react";

interface ReviewListProps {
  onAddReview: (review: Omit<FakeReview, "id">) => void;
}

export default function ReviewList({ onAddReview }: ReviewListProps) {
  const [reviews, setReviews] = useState<FakeReview[]>(FAKE_REVIEWS);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [girlName, setGirlName] = useState("Amanda Skena");
  const [reviewText, setReviewText] = useState("");
  const [hilariousOutcome, setHilariousOutcome] = useState("");
  const [showForm, setShowForm] = useState(false);

  const girlsList = ["Amanda Skena", "Yuki Kawaii", "Siska Ambyar", "Clara Glamour", "Rani Pemarah", "Fitri Anak Kosan"];

  const funOutcomes = [
    "Penyewa sekarang kecanduan dengerin lagu galau senja fiktif.",
    "Penyewa terpaksa ganti HP kamera boba karena digugat mental oleh pacar virtual.",
    "Penyewa tidak sengaja makan seblak level 50 lalu dilarikan ke puskesmas terdekat.",
    "Penyewa merasa bangga mabar Genshin Impact digendong penuh kemenangan virtual.",
    "Penyewa bernyanyi drakor subuh-subuh saking senangnya dimarahin cewek tsundere."
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !reviewText.trim()) return;

    const chosenOutcome = hilariousOutcome ? hilariousOutcome : funOutcomes[Math.floor(Math.random() * funOutcomes.length)];

    const newReview: FakeReview = {
      id: `rev-${Date.now()}`,
      author: author,
      age: Math.floor(Math.random() * 10) + 18,
      rating: rating,
      reviewText: reviewText,
      girlName: girlName,
      hilariousOutcome: chosenOutcome
    };

    setReviews([newReview, ...reviews]);
    onAddReview(newReview);

    // Reset Form
    setAuthor("");
    setReviewText("");
    setHilariousOutcome("");
    setShowForm(false);
  };

  return (
    <div className="space-y-6 text-left" id="reviews-section">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
            <span className="w-1.5 h-6 bg-[#F27D26] rounded-full inline-block"></span>
            Kata Mereka yang Pernah Baper (Review Jomblo)
          </h2>
          <p className="text-xs text-white/55">Ulasan jujur tanpa sensor dari nasabah setia kehaluan nasional</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-white/5 text-[#F27D26] hover:bg-white/10 border border-white/10 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          {showForm ? "Tutup Form" : "Tulis Kesan Halu Kamu"}
        </button>
      </div>

      {/* Write a Halu Review Form */}
      {showForm && (
        <form onSubmit={handleSubmitReview} className="glass p-6 rounded-3xl shadow-xl space-y-4 animate-fade-in max-w-xl text-left border-white/10 bg-black/40 text-white">
          <h3 className="text-xs font-bold text-[#F27D26] uppercase tracking-wider glow-text">Formulir Pengakuan Dosa Kencan</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-white/50 uppercase">Nama Anda / Inisial</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="misal: Jomblo Karatan"
                className="w-full border border-white/10 outline-none p-2.5 rounded-xl text-xs font-semibold focus:border-[#F27D26] bg-black/40 text-white placeholder-white/30"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-white/50 uppercase">Rating Kehaluan</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full border border-white/10 outline-none p-2.5 rounded-xl text-xs font-semibold focus:border-[#F27D26] bg-[#0c0c0c] text-white"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (Sangat Halu)</option>
                <option value={4}>⭐⭐⭐⭐ (Halu Menengah)</option>
                <option value={3}>⭐⭐⭐ (Cukup Sadar)</option>
                <option value={2}>⭐⭐ (Baperan Dikit)</option>
                <option value={1}>⭐ (Kenapa Aku Disini?)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-white/50 uppercase">Gadis yang Disewa</label>
              <select
                value={girlName}
                onChange={(e) => setGirlName(e.target.value)}
                className="w-full border border-white/10 outline-none p-2.5 rounded-xl text-xs font-semibold focus:border-[#F27D26] bg-[#0c0c0c] text-white"
              >
                {girlsList.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-white/50 uppercase">Dampak Fatal (Opsional)</label>
              <input
                type="text"
                value={hilariousOutcome}
                onChange={(e) => setHilariousOutcome(e.target.value)}
                placeholder="misal: Demam panggung beneran pas diajak VN"
                className="w-full border border-white/10 outline-none p-2.5 rounded-xl text-xs font-semibold focus:border-[#F27D26] bg-black/40 text-white placeholder-white/30"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-white/50 uppercase">Ulasan Kencan (Review)</label>
            <textarea
              required
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Ceritakan pengalaman seru mu kencan virtual disini..."
              className="w-full border border-white/10 outline-none p-2.5 rounded-xl text-xs font-medium focus:border-[#F27D26] bg-black/40 text-white placeholder-white/30 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#F27D26] hover:bg-[#ff8a38] font-bold text-xs text-black rounded-xl active:scale-95 transition-all shadow-md cursor-pointer"
          >
            Kirim Pengakuan Saya
          </button>
        </form>
      )}

      {/* Reviews Render Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left" id="reviews-renders-grid">
        {reviews.map((rev) => (
          <div key={rev.id} className="glass rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden flex flex-col justify-between border-white/5 text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#F27D26]/10 text-[#F27D26] flex items-center justify-center text-[10px] border border-[#F27D26]/20">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.author} <span className="text-white/40 font-normal">({rev.age} Thn)</span></h4>
                    <span className="text-[9px] bg-white/5 text-[#F27D26] px-1.5 py-0.5 rounded font-mono border border-white/10">
                      Sewa: {rev.girlName}
                    </span>
                  </div>
                </div>
                <div className="flex text-amber-400 text-xs gap-0.5">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 stroke-none" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed italic pt-1">
                &ldquo;{rev.reviewText}&rdquo;
              </p>
            </div>

            {/* Funny Outcome bottom banner */}
            <div className="bg-[#F27D26]/10 p-2.5 rounded-xl text-[9px] text-[#F27D26] border-l-2 border-[#F27D26] font-sans">
              ⚡ <strong>Dampak Tragis:</strong> {rev.hilariousOutcome}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
