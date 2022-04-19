import type {IBoard, BoardState, Cell} from '../../entities/board';
import type {IPiece} from '../../entities/piece';
import type {Point} from '../../utility/point';

export class Board implements IBoard {
  private readonly state: BoardState;

  constructor(state: BoardState) {
    this.state = state;
  }

  public get view(): Readonly<BoardState> {
    return this.state;
  }

  public update(point: Point, data: Partial<Cell>): void {
    const cell = this.findCell(point);

    if (!cell)
      throw new Error(`Cell not found at point ${JSON.stringify(point)}`);

    this.state[point.y][point.x] = {...cell, ...data};
  }

  public findCell({x, y}: Point): Cell | null {
    try {
      return this.view[y][x] || null;
    } catch {
      return null;
    }
  }

  public findPiece(position: Point): IPiece | null {
    for (const row of this.state) {
      for (const cell of row) {
        if (cell?.position.isEqual(position)) {
          return cell.piece || null;
        }
      }
    }

    return null;
  }
}
