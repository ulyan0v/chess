import type {IPiece} from './piece';
import type {Matrix, Nullable} from '../../shared/types/utility';
import type {Point} from '../utility/point';

export type Cell = {
  name: string;
  position: Point;
  piece?: Nullable<IPiece>;
  action?: Nullable<string>;
};

export type BoardState = Matrix<Nullable<Cell>>;

export interface IBoard {
  view: Readonly<BoardState>;
  update(point: Point, data: Partial<Cell>): void;
  findCell(point: Point): Readonly<Cell> | null;
  findPiece(point: Point): IPiece | null;
}
