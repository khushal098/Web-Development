import { KNIGHT_OFFSETS, DIAGONALS, STRAIGHTS, inBounds } from "./constants";


export function createInitialPosition() {
  const board = Array.from({ length: 8 }, () => Array(8).fill(null));
  [..."rnbqkbnr"].forEach((t, c) => {
    board[0][c] = { t, s: "b" };
    board[1][c] = { t: "p", s: "b" };
    board[6][c] = { t: "p", s: "w" };
    board[7][c] = { t, s: "w" };
  });
  return { board, turn: "w", castle: { wK: 1, wQ: 1, bK: 1, bQ: 1 }, ep: null };
}



export function isAttacked(board, r, c, by) {
  const pawnRow = by === "w" ? r + 1 : r - 1;
  for (const dc of [-1, 1]) {
    if (!inBounds(pawnRow, c + dc)) continue;
    const p = board[pawnRow][c + dc];
    if (p && p.s === by && p.t === "p") return true;
  }
  for (const [dr, dc] of KNIGHT_OFFSETS) {
    const R = r + dr, C = c + dc;
    if (!inBounds(R, C)) continue;
    const p = board[R][C];
    if (p && p.s === by && p.t === "n") return true;
  }
  for (const [dr, dc] of [...DIAGONALS, ...STRAIGHTS]) {
    const R = r + dr, C = c + dc;
    if (inBounds(R, C)) {
      const p = board[R][C];
      if (p && p.s === by && p.t === "k") return true;
    }
    for (let i = 1; inBounds(r + dr * i, c + dc * i); i++) {
      const p = board[r + dr * i][c + dc * i];
      if (!p) continue;
      const slides = p.t === "q" || (p.t === "b" && dr && dc) || (p.t === "r" && (!dr || !dc));
      if (p.s === by && slides) return true;
      break;
    }
  }
  return false;
}

export function isInCheck(position, side) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = position.board[r][c];
      if (p && p.t === "k" && p.s === side) {
        return isAttacked(position.board, r, c, side === "w" ? "b" : "w");
      }
    }
  }
  return false;
}
