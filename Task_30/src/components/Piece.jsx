import { GLYPH } from "../engine/constants";

export default function Piece({ type, side }) {


  return <span className={`pc ${side}`}>{GLYPH[type] + "\uFE0E"}</span>;
}
