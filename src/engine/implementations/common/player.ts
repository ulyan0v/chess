import type {PointState} from '../../utility/point';
import type {IPlayer, PlayerColor} from '../../entities/player';
import {Point} from '../../utility/point';

export class Player implements IPlayer {
  public readonly color: PlayerColor;

  private readonly movementDirection: Point;

  constructor(color: PlayerColor, movementDirection: PointState) {
    this.color = color;
    this.movementDirection = new Point(movementDirection);
  }

  public makeMove() {}

  public getMovementDirection(): Point {
    return this.movementDirection;
  }
}
