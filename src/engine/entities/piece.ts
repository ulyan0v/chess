import type {Cell} from './board';
import type {Point} from '../utility/point';
import type {PlayerColor} from './player';
import type {Move} from './gameplay';

export interface IPiece {
  name: string;
  color: PlayerColor;
  isEnemy(piece: IPiece): boolean;
  possibleMovesGenerator(
    position: Point,
    movementDirection: Point
  ): Generator<Point, Move[], Cell | null>;
  onMove?: (move: Move) => void;
}
