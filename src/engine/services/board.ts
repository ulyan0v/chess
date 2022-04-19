import type {BoardState, IBoard} from '../entities/board';
import type {IPlayer} from '../entities/player';
import type {Point} from '../utility/point';
import type {EventEmitter} from '../utility/eventEmitter';
import type {Move} from '../entities/gameplay';

export class BoardService {
  private readonly board: IBoard;
  private readonly eventEmitter: EventEmitter;

  constructor(board: IBoard, eventEmitter: EventEmitter) {
    this.board = board;
    this.eventEmitter = eventEmitter;

    this.eventEmitter.subscribe('move', this.hidePossibleMoves.bind(this));
  }

  public getView(): Readonly<BoardState> {
    return this.board.view;
  }

  public showPossibleMoves(player: IPlayer, point: Point): void {
    this.hideMoves();

    const moves = this.getPossibleMoves(player, point);

    for (const {to, action} of moves) {
      this.board.update(to, {action});
    }

    this.notifyChange();
  }

  public hidePossibleMoves(): void {
    this.hideMoves();
    this.notifyChange();
  }

  private notifyChange(): void {
    this.eventEmitter.emit('boardUpdate', this.board.view);
  }

  private hideMoves(): void {
    for (const row of this.board.view) {
      for (const cell of row) {
        if (cell?.action) this.board.update(cell.position, {action: null});
      }
    }
  }

  private getPossibleMoves(player: IPlayer, point: Point): Move[] {
    const piece = this.board.findPiece(point);

    if (!piece) throw new Error(`No piece in ${JSON.stringify(point)}`);
    if (!player) throw new Error('Player not found');

    const movesGenerator = piece.possibleMovesGenerator(
      point,
      player.getMovementDirection()
    );

    let cellRequest = movesGenerator.next();

    while (true) {
      if (cellRequest.done) break;

      cellRequest = movesGenerator.next(this.board.findCell(cellRequest.value));
    }

    return cellRequest.value;
  }
}
