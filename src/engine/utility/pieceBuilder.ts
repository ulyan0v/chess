import type {IPiece} from '../entities/piece';
import type {InitPiece} from './boardState';
import type {PointState} from './point';

type PieceConstructor<
  T extends new (...params: ConstructorParameters<T>) => IPiece
> = new (...params: ConstructorParameters<T>) => IPiece;

type PieceBuilder<T extends PieceConstructor<T>> = (
  point: PointState,
  ...params: ConstructorParameters<T>
) => InitPiece;

export const pieceBuilder = <T extends PieceConstructor<T>>(
  Piece: T
): PieceBuilder<T> => {
  return (point: PointState, ...params: ConstructorParameters<T>) => ({
    piece: new Piece(...params),
    point: point,
  });
};
