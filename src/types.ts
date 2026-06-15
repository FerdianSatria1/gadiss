export interface GirlProfile {
  id: string;
  name: string;
  age: number;
  avatar: string; // Description or color-themed avatar placeholder
  mood: string; // e.g. "Skena Jaksel", "Wibu Gacor", "Melankolis Overthinking", "Galak Sayang", "Matre Glamour", "Praktis Kosan"
  description: string;
  pricePerDay: number; // in Halu Rupiah (IDH)
  stats: {
    charm: number;
    chillRate: number;
    patience: number;
    demands: number; // Level of weird demands they make
  };
  catchphrases: string[];
  hobbies: string[];
  likes: string[];
  dislikes: string[];
}

export interface DatingPackage {
  id: string;
  name: string;
  description: string;
  durationCostMultiplier: number;
  perDatingPointBonuses: number;
}

export interface ActiveBooking {
  id: string;
  girlId: string;
  girlName: string;
  girlAvatar: string;
  packageName: string;
  locationName: string;
  startDate: string;
  endDate: string;
  days: number;
  totalCost: number;
  affectionLevel: number; // 0 to 100
  chatHistory: Message[];
  status: 'active' | 'completed' | 'canceled';
}

export interface Message {
  id: string;
  sender: 'user' | 'girl' | 'system';
  text: string;
  timestamp: string;
}

export interface GiftItem {
  id: string;
  name: string;
  icon: string;
  cost: number;
  description: string;
  affectionBonus: number;
  funnyReply: string; // fallback if AI is slow
}

export interface FakeReview {
  id: string;
  author: string;
  age: number;
  rating: number;
  reviewText: string;
  girlName: string;
  hilariousOutcome: string;
}
