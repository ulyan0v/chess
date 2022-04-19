import {Piece} from '../../common/piece';
import {Point} from '../../../utility/point';
import type {Cell} from '../../../entities/board';
import type {Move} from '../../../entities/gameplay';

export class King extends Piece {
  public readonly name: string = King.name;

  *possibleMovesGenerator(): Generator<Point, Move[], Cell | null> {
    return [];
  }
}
