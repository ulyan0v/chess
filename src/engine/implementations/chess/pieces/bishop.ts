import {Piece} from '../../common/piece';
import {Point} from '../../../utility/point';
import type {Cell} from '../../../entities/board';
import type {Move} from '../../../entities/gameplay';
import {Actions} from '../actions';

export class Bishop extends Piece {
  public readonly name: string = Bishop.name;

  public static readonly moveDirections: Point[] = [
    new Point({x: 1, y: 1}),
    new Point({x: 1, y: -1}),
    new Point({x: -1, y: 1}),
    new Point({x: -1, y: -1}),
  ];

  public *possibleMovesGenerator(
    currentPosition: Point
  ): Generator<Point, Move[], Cell | null> {
    const moves: Move[] = [];

    for (const direction of Bishop.moveDirections) {
      for (let index = 1; ; index++) {
        const position = currentPosition.add(direction.multiply(index));
        const cell = yield position;
        const piece = cell?.piece;

        if (!cell) {
          break;
        } else if (!piece) {
          moves.push({
            from: currentPosition,
            to: position,
            action: Actions.Move,
          });

          continue;
        } else if (piece.isEnemy(this)) {
          moves.push({
            from: currentPosition,
            to: position,
            action: Actions.Hit,
          });
        }

        break;
      }
    }

    return moves;
  }
}
