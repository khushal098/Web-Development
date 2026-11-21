import Piece from "./Piece";
import PromotionPicker from "./PromotionPicker";
import { fileOf } from "../engine/notation";

export default function Board({ position, selected, targets, lastMove, inCheck, promotion, onSquareClick, onPromote }) {
  const { board, turn } = position;

  return (
    <div className="board">
      {board.map((row, r) =>
        row.map((piece, c) => {
          const target = targets.find((m) => m.tr === r && m.tc === c);
          const isSelected = selected && selected[0] === r && selected[1] === c;
          const isLast = lastMove && ((lastMove.fr === r && lastMove.fc === c) || (lastMove.tr === r && lastMove.tc === c));
          const className = [
            "sq",
            (r + c) % 2 ? "d" : "l",
            isSelected && "sel",
            isLast && "last",
            piece?.t === "k" && piece.s === turn && inCheck && "chk",
            target && (piece || target.ep ? "cap" : "dot"),
          ].filter(Boolean).join(" ");

          return (
            <div key={`${r}${c}`} className={className} onClick={() => onSquareClick(r, c)}>
              {c === 0 && <i className="rk">{8 - r}</i>}
              {r === 7 && <i className="fl">{fileOf(c)}</i>}
              {piece && <Piece type={piece.t} side={piece.s} />}
            </div>
          );
        })
      )}
      {promotion && <PromotionPicker moves={promotion} turn={turn} onPick={onPromote} />}
    </div>
  );
}
