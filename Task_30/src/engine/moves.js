import { KNIGHT_OFFSETS, DIAGONALS, STRAIGHTS, inBounds } from "./constants";
import { isAttacked, isInCheck } from "./board";



export function pseudoMoves(position, r, c) {
  const { board, turn: side } = position;
  const piece = board[r][c];
  const moves = [];
  const add = (R, C, extra = {}) => moves.push({ fr: r, fc: c, tr: R, tc: C, ...extra });

  if (piece.t === "p") {
    const dir = side === "w" ? -1 : 1;
    const lastRow = side === "w" ? 0 : 7;
    const startRow = side === "w" ? 6 : 1;
    const push = (R, C) => {
      if (R === lastRow) for (const promo of "qrbn") add(R, C, { promo });
      else add(R, C);
    };
    if (!board[r + dir][c]) {
      push(r + dir, c);
      if (r === startRow && !board[r + 2 * dir][c]) add(r + 2 * dir, c, { dbl: 1 });
    }
    for (const dc of [-1, 1]) {
      const C = c + dc;
      if (!inBounds(r + dir, C)) continue;
      const target = board[r + dir][C];
      if (target && target.s !== side) push(r + dir, C);
      else if (!target && position.ep && position.ep[0] === r + dir && position.ep[1] === C) add(r + dir, C, { ep: 1 });
    }
  } else if (piece.t === "n" || piece.t === "k") {
    const offsets = piece.t === "n" ? KNIGHT_OFFSETS : [...DIAGONALS, ...STRAIGHTS];
    for (const [dr, dc] of offsets) {
      const R = r + dr, C = c + dc;
      if (inBounds(R, C) && (!board[R][C] || board[R][C].s !== side)) add(R, C);
    }
    if (piece.t === "k") addCastling(position, r, c, add);
  } else {
    const dirs = piece.t === "b" ? DIAGONALS : piece.t === "r" ? STRAIGHTS : [...DIAGONALS, ...STRAIGHTS];
    for (const [dr, dc] of dirs) {
      for (let R = r + dr, C = c + dc; inBounds(R, C); R += dr, C += dc) {
        if (!board[R][C]) add(R, C);
        else {
          if (board[R][C].s !== side) add(R, C);
          break;
        }
      }
    }
  }
  return moves;
}

function addCastling(position, r, c, add) {
  const { board, turn: side, castle } = position;
  const home = side === "w" ? 7 : 0;
  const foe = side === "w" ? "b" : "w";
  if (r !== home || c !== 4 || isAttacked(board, home, 4, foe)) return;
  const safe = (...cols) => cols.every((col) => !isAttacked(board, home, col, foe));
  if (castle[side + "K"] && !board[home][5] && !board[home][6] && board[home][7]?.t === "r" && safe(5, 6)) {
    add(home, 6, { castle: "K" });
  }
  if (castle[side + "Q"] && !board[home][1] && !board[home][2] && !board[home][3] && board[home][0]?.t === "r" && safe(3, 2)) {
    add(home, 2, { castle: "Q" });
  }
}



export function applyMove(position, m) {
  const board = position.board.map((row) => [...row]);
  const piece = board[m.fr][m.fc];
  const side = piece.s;
  let captured = board[m.tr][m.tc];

  if (m.ep) {
    captured = board[m.fr][m.tc];
    board[m.fr][m.tc] = null;
  }
  board[m.fr][m.fc] = null;
  board[m.tr][m.tc] = m.promo ? { t: m.promo, s: side } : piece;

  if (m.castle) {
    const row = m.tr;
    if (m.castle === "K") { board[row][5] = board[row][7]; board[row][7] = null; }
    else { board[row][3] = board[row][0]; board[row][0] = null; }
  }

  const castle = { ...position.castle };
  if (piece.t === "k") { castle[side + "K"] = 0; castle[side + "Q"] = 0; }
  for (const [R, C, key] of [[7, 0, "wQ"], [7, 7, "wK"], [0, 0, "bQ"], [0, 7, "bK"]]) {
    if ((m.fr === R && m.fc === C) || (m.tr === R && m.tc === C)) castle[key] = 0;
  }

  return {
    position: {
      board,
      turn: side === "w" ? "b" : "w",
      castle,
      ep: m.dbl ? [(m.fr + m.tr) / 2, m.fc] : null,
    },
    captured,
  };
}



export const legalMovesFrom = (position, r, c) =>
  pseudoMoves(position, r, c).filter((m) => !isInCheck(applyMove(position, m).position, position.turn));



export function allLegalMoves(position) {
  const moves = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (position.board[r][c]?.s === position.turn) moves.push(...legalMovesFrom(position, r, c));
    }
  }
  return moves;
}
