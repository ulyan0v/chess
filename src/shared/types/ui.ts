import {Matrix, Nullable} from './utility';

export type Position = {
  x: number;
  y: number;
};

export type MoveCommand = {
  from: Position;
  to: Position;
  action: string;
};

export type HexColor = string;

export type Piece = {
  name: string;
  color: string;
  shortName: string;
  position: Position;
};

export type CellView = {
  name: string;
  position: Position;
  action?: Nullable<string>;
  piece?: Nullable<Piece>;
};

export type BoardView = Matrix<Nullable<CellView>>;
