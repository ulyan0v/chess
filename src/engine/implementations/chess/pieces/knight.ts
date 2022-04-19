import {Piece} from '../../common/piece';
import {Point} from '../../../utility/point';
import type {Cell} from '../../../entities/board';
import type {Move} from '../../../entities/gameplay';
import {Actions} from '../actions';

export class Knight extends Piece {
  public readonly name: string = Knight.name;

  public static readonly moveDirections: Point[] = [
    new Point({x: 2, y: 1}),
    new Point({x: 2, y: -1}),
    new Point({x: -2, y: 1}),
    new Point({x: -2, y: -1}),
    new Point({x: 1, y: 2}),
    new Point({x: 1, y: -2}),
    new Point({x: -1, y: 2}),
    new Point({x: -1, y: -2}),
  ];

  *possibleMovesGenerator(
    currentPosition: Point
  ): Generator<Point, Move[], Cell | null> {
    const moves: Move[] = [];

    for (const direction of Knight.moveDirections) {
      const position = currentPosition.add(direction);
      const cell = yield position;
      const piece = cell?.piece;

      if (!cell) continue;

      if (!piece || piece.isEnemy(this)) {
        moves.push({
          from: currentPosition,
          to: position,
          action: piece?.isEnemy(this) ? Actions.Hit : Actions.Move,
        });
      }
    }

    return moves;
  }
}
