import type {IPiece} from '../../entities/piece';
import type {Cell} from '../../entities/board';
import type {PlayerColor} from '../../entities/player';
import type {Point} from '../../utility/point';
import type {Move} from '../../entities/gameplay';

export abstract class Piece implements IPiece {
  public readonly color: PlayerColor;

  public abstract readonly name: string;

  constructor(color: PlayerColor) {
    this.color = color;
  }

  public isEnemy(piece: Piece): boolean {
    return this.color !== piece.color;
  }

  abstract possibleMovesGenerator(
    position: Point,
    movementDirection: Point
  ): Generator<Point, Move[], Cell | null>;
}
