# React Chess

Offline two-player chess built with React and no chess libraries.

## Run
    npm install
    npm run dev

## Structure
    src/engine       Pure chess rules (no React): board, move generation, notation
    src/hooks        useChessGame: game state, clocks, undo, input handling
    src/components   Board, Piece, PlayerBar, MovePanel, PromotionPicker
    src/utils        Formatting helpers
    src/styles       Stylesheet

## Features
Legal moves for all pieces (castling, en passant, promotion), check / checkmate / stalemate,
per-player countdown clocks, SAN move list, undo, legal-move highlights, captured pieces.
