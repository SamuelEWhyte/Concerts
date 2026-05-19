import type { ConcertWithCosts } from "./types";
import { concertTotal } from "./dashboard";

export type Badge = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
};

export function computeBadges(concerts: ConcertWithCosts[]): Badge[] {
  const count = concerts.length;
  const states = new Set(
    concerts.map((c) => c.state).filter((s): s is string => Boolean(s))
  );

  let pennyPincher = false;
  let bigSpender = false;
  let fiveStar = false;
  let roadWarrior = false;
  let valueHunter = false;
  let nightOwl = false;

  for (const concert of concerts) {
    const total = concertTotal(concert);
    if (total < 50) pennyPincher = true;
    if (total > 500) bigSpender = true;
    if (concert.fun_rating === 5) fiveStar = true;
    if ((concert.duration_hours ?? 0) >= 6) nightOwl = true;

    const travelSpend = concert.concert_costs
      .filter((c) => c.category === "travel")
      .reduce((sum, c) => sum + Number(c.amount), 0);
    if (travelSpend >= 100) roadWarrior = true;

    if (total > 0) {
      const score = concert.fun_rating / (total / 100);
      if (score > 5) valueHunter = true;
    }
  }

  return [
    {
      id: "first-show",
      name: "First Show",
      description: "Log your first concert",
      emoji: "🎤",
      unlocked: count >= 1,
    },
    {
      id: "hat-trick",
      name: "Hat Trick",
      description: "Attend 3 concerts",
      emoji: "🎩",
      unlocked: count >= 3,
    },
    {
      id: "decade",
      name: "Decade",
      description: "Attend 10 concerts",
      emoji: "🔟",
      unlocked: count >= 10,
    },
    {
      id: "quarter-century",
      name: "Quarter Century",
      description: "Attend 25 concerts",
      emoji: "🏆",
      unlocked: count >= 25,
    },
    {
      id: "penny-pincher",
      name: "Penny Pincher",
      description: "Spend under $50 on a show",
      emoji: "🪙",
      unlocked: pennyPincher,
    },
    {
      id: "big-spender",
      name: "Big Spender",
      description: "Spend over $500 on a show",
      emoji: "💸",
      unlocked: bigSpender,
    },
    {
      id: "five-star",
      name: "Five Star Fan",
      description: "Rate a concert 5 stars",
      emoji: "⭐",
      unlocked: fiveStar,
    },
    {
      id: "road-warrior",
      name: "Road Warrior",
      description: "Spend $100+ on travel for one show",
      emoji: "🚗",
      unlocked: roadWarrior,
    },
    {
      id: "festival-hopper",
      name: "Festival Hopper",
      description: "Concerts in 3+ different states",
      emoji: "🎪",
      unlocked: states.size >= 3,
    },
    {
      id: "coast-to-coast",
      name: "Coast to Coast",
      description: "Concerts in 5+ different states",
      emoji: "🗺️",
      unlocked: states.size >= 5,
    },
    {
      id: "value-hunter",
      name: "Value Hunter",
      description: "High fun per dollar on a show",
      emoji: "🎯",
      unlocked: valueHunter,
    },
    {
      id: "night-owl",
      name: "Night Owl",
      description: "6+ hours at a show",
      emoji: "🦉",
      unlocked: nightOwl,
    },
  ];
}
