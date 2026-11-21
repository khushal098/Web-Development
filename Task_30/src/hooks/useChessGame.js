import { useState, useEffect } from "react";
import { createInitialPosition, isInCheck } from "../engine/board";
import { applyMove, legalMovesFrom, allLegalMoves, pseudoMoves } from "../engine/moves";
import { toSan } from "../engine/notation";
import { sideName } from "../utils/format";

export const TIME_PER_PLAYER = 600; 

const newGame = () => ({
  position: createInitialPosition(),
  moves: [],
  captured: { w: [], b: [] },
  lastMove: null,
  over: null,
  history: [], 
});

export default function useChessGame() {
  const [game, setGame] = useState(newGame);
  const [times, setTimes] = useState({ w: TIME_PER_PLAYER, b: TIME_PER_PLAYER });
  const [selected, setSelected] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const [message, setMessage] = useState("White to move");

  const { position } = game;
  const turn = position.turn;
  const inCheck = isInCheck(position, turn);
  const targets = selected ? legalMovesFrom(position, selected[0], selected[1]) : [];

  // Only the side to move has a running clock.
  useEffect(() => {
    if (game.over) return;
    const id = setInterval(() => setTimes((t) => ({ ...t, [turn]: Math.max(0, t[turn] - 1) })), 1000);
    return () => clearInterval(id);
  }, [turn, game.over]);

  useEffect(() => {
    if (game.over || times[turn] !== 0) return;
    const over = `${sideName(turn === "w" ? "b" : "w")} wins on time`;
    setGame((g) => ({ ...g, over }));
    setMessage(over);
    setSelected(null);
  }, [times, turn, game.over]);

  const playMove = (move) => {
    const legal = allLegalMoves(position);
    const { position: next, captured } = applyMove(position, move);
    let notation = toSan(position, move, legal);
    let over = null;

    const check = isInCheck(next, next.turn);
    if (allLegalMoves(next).length === 0) {
      if (check) { notation += "#"; over = `Checkmate! ${sideName(turn)} wins`; }
      else over = "Stalemate — draw";
    } else if (check) notation += "+";

    const { history, ...snapshot } = game;
    setGame({
      position: next,
      moves: [...game.moves, notation],
      captured: captured ? { ...game.captured, [turn]: [...game.captured[turn], captured.t] } : game.captured,
      lastMove: move,
      over,
      history: [...history, snapshot],
    });
    setSelected(null);
    setPromotion(null);
    setMessage(over || (check ? `Check! ${sideName(next.turn)} to move` : `${sideName(next.turn)} to move`));
  };

  const handleSquareClick = (r, c) => {
    if (game.over || promotion) return;
    const piece = position.board[r][c];

    if (selected) {
      const matches = targets.filter((m) => m.tr === r && m.tc === c);
      if (matches.length) return matches.length > 1 ? setPromotion(matches) : playMove(matches[0]);
      if (piece?.s === turn) return setSelected([r, c]);

      setSelected(null);
      if (selected[0] === r && selected[1] === c) return;
      const reachable = pseudoMoves(position, selected[0], selected[1]).some((m) => m.tr === r && m.tc === c);
      return setMessage(reachable ? "Illegal move: your king would be in check" : "Illegal move for that piece");
    }
    if (piece?.s === turn) setSelected([r, c]);
    else if (piece) setMessage(`Not your piece — it's ${sideName(turn)}'s turn`);
  };

  const undo = () => {
    if (!game.history.length) return;
    const previous = game.history[game.history.length - 1];
    setGame({ ...previous, history: game.history.slice(0, -1) });
    setSelected(null);
    setPromotion(null);
    setMessage(`Move undone — ${sideName(previous.position.turn)} to move`);
  };

  const reset = () => {
    setGame(newGame());
    setTimes({ w: TIME_PER_PLAYER, b: TIME_PER_PLAYER });
    setSelected(null);
    setPromotion(null);
    setMessage("White to move");
  };

  return { game, times, selected, targets, promotion, message, inCheck, handleSquareClick, promote: playMove, undo, reset };
}
