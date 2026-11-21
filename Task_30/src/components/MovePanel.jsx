export default function MovePanel({ message, status, moves, canUndo, onUndo, onReset }) {
  const rows = [];
  for (let i = 0; i < moves.length; i += 2) rows.push({ no: i / 2 + 1, white: moves[i], black: moves[i + 1] });

  return (
    <aside className="panel">
      <div className={`msg ${status}`}>{message}</div>
      <div className="btns">
        <button onClick={onUndo} disabled={!canUndo}>↶ Undo</button>
        <button onClick={onReset}>New game</button>
      </div>
      <h3>Moves</h3>
      <div className="moves">
        {rows.length === 0 && <em>No moves yet</em>}
        {rows.map((row) => (
          <div key={row.no}>
            <span>{row.no}.</span>
            <span>{row.white}</span>
            <span>{row.black}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
