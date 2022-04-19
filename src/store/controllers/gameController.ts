import {makeAutoObservable} from 'mobx';
import {GameFacade} from '../../engine/facade';
import type {BoardView, Piece, Position} from '../../shared/types/ui';
import type {BoardState} from '../../engine/entities/board';
import type {PointState} from '../../engine/utility/point';
import {mapToMove, mapToViewBoard} from '../../shared/mapper';

export class GameController {
  private readonly game: GameFacade;
  private state: Readonly<BoardView>;

  private selectedPiece: Piece | null = null;

  constructor(game: GameFacade) {
    makeAutoObservable(this, {}, {autoBind: true});

    this.game = game;
    this.state = mapToViewBoard(game.view);

    this.game.subscribe('boardUpdate', this.onChange);
  }

  public get view(): Readonly<BoardView> {
    return this.state;
  }

  public togglePieceSelect(piece: Piece): void {
    if (
      this.selectedPiece &&
      this.isEqualPositions(this.selectedPiece.position, piece.position)
    ) {
      this.selectedPiece = null;
      this.game.hidePossibleMoves();
    } else {
      this.selectedPiece = piece;
      this.game.showPossibleMoves(this.selectedPiece.color, piece.position);
    }
  }

  public move(point: Position, action: string): void {
    if (!this.selectedPiece) throw new Error('Piece not found');

    const {color, position} = this.selectedPiece;

    this.game.move(color, mapToMove({from: position, to: point, action}));
  }

  private onChange(data: Readonly<BoardState>): void {
    this.state = mapToViewBoard(data);
  }

  private isEqualPositions(
    position1: PointState,
    position2: PointState
  ): boolean {
    return position1.x === position2.x && position1.y === position2.y;
  }
}
