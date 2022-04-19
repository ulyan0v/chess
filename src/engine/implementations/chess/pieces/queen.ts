import {Piece} from '../../common/piece';
import {Point} from '../../../utility/point';
import {Bishop} from './bishop';
import {Rook} from './rook';
import type {Cell} from '../../../entities/board';
import type {Move} from '../../../entities/gameplay';
import {Actions} from '../actions';

export class Queen extends Piece {
  public readonly name: string = Queen.name;

  public static readonly moveDirections: Point[] = [
    ...Rook.moveDirections,
    ...Bishop.moveDirections,
  ];

  public *possibleMovesGenerator(
    currentPosition: Point
  ): Generator<Point, Move[], Cell | null> {
    const moves: Move[] = [];

    for (const direction of Queen.moveDirections) {
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
