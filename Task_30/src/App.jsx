import Board from "./components/Board";
import PlayerBar from "./components/PlayerBar";
import MovePanel from "./components/MovePanel";
import useChessGame from "./hooks/useChessGame";

export default function App() {
  const chess = useChessGame();
  const { game, times, inCheck, message } = chess;
  const active = game.over ? null : game.position.turn;

  return (
    <div className="app">
      <main>
        <PlayerBar side="b" time={times.b} captured={game.captured.b} active={active === "b"} />
        <Board
          position={game.position}
          selected={chess.selected}
          targets={chess.targets}
          lastMove={game.lastMove}
          inCheck={inCheck}
          promotion={chess.promotion}
          onSquareClick={chess.handleSquareClick}
          onPromote={chess.promote}
        />
        <PlayerBar side="w" time={times.w} captured={game.captured.w} active={active === "w"} />
      </main>
      <MovePanel
        message={message}
        status={game.over ? "over" : inCheck ? "warn" : ""}
        moves={game.moves}
        canUndo={game.history.length > 0}
        onUndo={chess.undo}
        onReset={chess.reset}
      />
    </div>
  );
}
