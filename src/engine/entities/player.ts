import type {Point} from '../utility/point';

export type PlayerColor = string;

export interface IPlayer {
  color: PlayerColor;
  getMovementDirection(): Point;
  makeMove(): void;
}
