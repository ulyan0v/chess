import type {Point} from '../utility/point';
import type {IPlayer} from './player';

export type Move = {
  from: Point;
  to: Point;
  action: string;
};

export interface IGameplay {
  makeMove(player: IPlayer, move: Move): void;
}
