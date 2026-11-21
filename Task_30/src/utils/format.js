export const sideName = (side) => (side === "w" ? "White" : "Black");

export const formatTime = (seconds) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
