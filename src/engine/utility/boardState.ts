import type {BoardState} from '../entities/board';
import type {IPiece} from '../entities/piece';
import {Point, PointState} from './point';

export type InitPiece<T extends IPiece = IPiece> = {
  piece: T;
  point: PointState;
};

export const createBoardState = (
  pieces: InitPiece[],
  size: number = 8
): BoardState => {
  const cells: BoardState = [];

  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    const row: typeof cells[0] = [];

    for (let cellIndex = 0; cellIndex < size; cellIndex++) {
      const position = new Point({x: cellIndex, y: rowIndex});

      row.push({
        name: '',
        position: position,
        piece: pieces.find(({point}) => position.isEqual(point))?.piece || null,
      });
    }

    cells.push(row);
  }

  return cells;
};
