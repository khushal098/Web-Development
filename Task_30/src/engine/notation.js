export const fileOf = (c) => "abcdefgh"[c];
export const squareName = (r, c) => fileOf(c) + (8 - r);




export function toSan(position, m, legal) {
  const piece = position.board[m.fr][m.fc];
  const isCapture = position.board[m.tr][m.tc] || m.ep;

  if (m.castle) return m.castle === "K" ? "O-O" : "O-O-O";
  if (piece.t === "p") {
    return (isCapture ? fileOf(m.fc) + "x" : "") + squareName(m.tr, m.tc) + (m.promo ? "=" + m.promo.toUpperCase() : "");
  }

  const rivals = legal.filter(
    (x) => x !== m && x.tr === m.tr && x.tc === m.tc && position.board[x.fr][x.fc].t === piece.t
  );
  let disambiguation = "";
  if (rivals.length) {
    const sameFile = rivals.some((x) => x.fc === m.fc);
    const sameRank = rivals.some((x) => x.fr === m.fr);
    disambiguation = !sameFile ? fileOf(m.fc) : !sameRank ? String(8 - m.fr) : fileOf(m.fc) + (8 - m.fr);
  }
  return piece.t.toUpperCase() + disambiguation + (isCapture ? "x" : "") + squareName(m.tr, m.tc);
}
