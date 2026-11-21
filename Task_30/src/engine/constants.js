export const GLYPH = { p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚" };

export const KNIGHT_OFFSETS = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]];
export const DIAGONALS = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
export const STRAIGHTS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

export const inBounds = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
