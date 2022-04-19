import type {BoardView, MoveCommand} from './types/ui';
import type {BoardState} from '../engine/entities/board';
import type {Move} from '../engine/entities/gameplay';
import {Point} from '../engine/utility/point';

export const mapToViewBoard = (board: Readonly<BoardState>): BoardView => {
  return board.map((row) => {
    return row.map((cell) => {
      return (
        cell && {
          ...cell,
          piece: cell.piece && {
            name: cell.piece.name,
            color: cell.piece.color,
            shortName: cell.piece.name[0].toLowerCase(),
            position: cell.position,
          },
        }
      );
    });
  });
};

export const mapToMove = (move: MoveCommand): Move => {
  return {
    from: new Point(move.from),
    to: new Point(move.to),
    action: move.action,
  };
};
