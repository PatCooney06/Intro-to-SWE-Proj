const POINTS_KEY = "userPoints";
const STREAK_KEY = "dailyStreak";
const LAST_DATE_KEY = "lastLogDate";

export const getPoints = (): number => {
  return parseInt(localStorage.getItem(POINTS_KEY) || "0");
};

export const addPoints = (points: number) => {
  const current = getPoints();
  localStorage.setItem(POINTS_KEY, (current + points).toString());
};

export const getStreak = (): number => {
  return parseInt(localStorage.getItem(STREAK_KEY) || "0");
};

export const updateStreak = () => {
  const today = new Date().toDateString();
  const last = localStorage.getItem(LAST_DATE_KEY);

  if (last === today) {
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (last === yesterday.toDateString()) {
    const streak = getStreak() + 1;
    localStorage.setItem(STREAK_KEY, streak.toString());
  } else {
    localStorage.setItem(STREAK_KEY, "1");
  }

  localStorage.setItem(LAST_DATE_KEY, today);
};
