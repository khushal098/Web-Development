import Piece from "./Piece";

export default function PromotionPicker({ moves, turn, onPick }) {
  return (
    <div className="promo">
      <div>
        Promote to:
        <div>
          {moves.map((m) => (
            <button key={m.promo} onClick={() => onPick(m)}>
              <Piece type={m.promo} side={turn} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
