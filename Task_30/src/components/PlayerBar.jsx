import Piece from "./Piece";
import { formatTime, sideName } from "../utils/format";

export default function PlayerBar({ side, time, captured, active }) {
  const victim = side === "w" ? "b" : "w";
  return (
    <div className={"bar" + (active ? " on" : "")}>
      <b>{sideName(side)}</b>
      <span className="cp">
        {captured.map((type, i) => <Piece key={i} type={type} side={victim} />)}
      </span>
      <span className={"clk" + (time < 30 ? " low" : "")}>{formatTime(time)}</span>
    </div>
  );
}
