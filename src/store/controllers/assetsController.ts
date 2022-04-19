import type {Piece} from '../../shared/types/ui';
import {
  King,
  Queen,
  Bishop,
  Knight,
  Rook,
  Pawn,
} from '../../engine/implementations/chess/pieces';

const whitePieces: Record<string, string> = {
  [Pawn.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png',
  [Knight.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png',
  [Bishop.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png',
  [Rook.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png',
  [Queen.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png',
  [King.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png',
};

const blackPieces: Record<string, string> = {
  [Pawn.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png',
  [Knight.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png',
  [Bishop.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png',
  [Rook.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png',
  [Queen.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png',
  [King.name]:
    'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png',
};

export class AssetsController {
  public getPieceImage(piece: Piece): string {
    if (piece.color === 'white') return whitePieces[piece.name];
    if (piece.color === 'black') return blackPieces[piece.name];

    throw new Error(`Invalid piece: ${piece.color} ${piece.name}`);
  }
}
