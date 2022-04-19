import {Piece} from '../../common/piece';
import type {Point} from '../../../utility/point';
import type {Cell} from '../../../entities/board';
import type {Move} from '../../../entities/gameplay';
import {Actions} from '../actions';

export class Pawn extends Piece {
  public readonly name: string = Pawn.name;

  private _canMakeLongMove: boolean = true;
  private _canBeAttackedOnPass: boolean = false;

  public get canMakeLongMove(): boolean {
    return this._canMakeLongMove;
  }

  public get canAttackedOnPass(): boolean {
    return this._canBeAttackedOnPass;
  }

  public onMove({from, to}: Move): void {
    if (Math.abs(from.y - to.y) > 1) {
      this._canMakeLongMove = false;
      this._canBeAttackedOnPass = true;
    } else {
      this._canBeAttackedOnPass = false;
    }
  }

  public *possibleMovesGenerator(
    currentPosition: Point,
    movementDirection: Point
  ): Generator<Point, Move[], Cell | null> {
    const moves: Move[] = [
      ...(yield* this.defaultHitsGenerator(currentPosition, movementDirection)),
      ...(yield* this.hitsOnPassGenerator(currentPosition, movementDirection)),
    ];

    const shortMove = yield* this.shortMoveGenerator(
      currentPosition,
      movementDirection
    );

    if (shortMove) moves.push(shortMove);
    else return moves;

    const longMove = yield* this.longMoveGenerator(
      currentPosition,
      movementDirection
    );

    if (longMove) moves.push(longMove);

    return moves;
  }

  private *shortMoveGenerator(
    currentPosition: Point,
    movementDirection: Point
  ): Generator<Point, Move | null, Cell | null> {
    const shortMovePosition = currentPosition.add(movementDirection);
    const shortMoveCell = yield shortMovePosition;

    if (shortMoveCell?.piece) return null;

    return {
      from: currentPosition,
      to: shortMovePosition,
      action: Actions.Move,
    };
  }

  private *longMoveGenerator(
    currentPosition: Point,
    movementDirection: Point
  ): Generator<Point, Move | null, Cell | null> {
    if (!this.canMakeLongMove) return null;

    const shortMovePosition = currentPosition.add(
      movementDirection.multiply(2)
    );
    const shortMoveCell = yield shortMovePosition;

    if (shortMoveCell?.piece) return null;

    return {
      from: currentPosition,
      to: shortMovePosition,
      action: Actions.Move,
    };
  }

  private *defaultHitsGenerator(
    currentPosition: Point,
    movementDirection: Point
  ): Generator<Point, Move[], Cell | null> {
    const cells = [
      yield currentPosition.add(movementDirection.add({x: 1, y: 0})),
      yield currentPosition.add(movementDirection.add({x: -1, y: 0})),
    ].filter(Boolean) as Cell[];

    return cells
      .filter(({piece}) => piece?.isEnemy(this))
      .map(({position}) => ({
        from: currentPosition,
        to: position,
        action: Actions.Hit,
      }));
  }

  private *hitsOnPassGenerator(
    currentPosition: Point,
    movementDirection: Point
  ): Generator<Point, Move[], Cell | null> {
    const cells = [
      yield currentPosition.add({x: -1, y: 0}),
      yield currentPosition.add({x: 1, y: 0}),
    ].filter(Boolean) as Cell[];

    return cells
      .filter(({piece}) => piece instanceof Pawn && piece.canAttackedOnPass)
      .map(({position}) => ({
        from: currentPosition,
        to: position.add(movementDirection),
        action: Actions.Hit,
      }));
  }
}
