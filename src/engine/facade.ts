import type {IPlayer, PlayerColor} from './entities/player';
import type {IBoard, BoardState} from './entities/board';
import type {IGameplay, Move} from './entities/gameplay';
import {EventEmitter, Event, Callback} from './utility/eventEmitter';
import {Point, PointState} from './utility/point';
import {PlayersService} from './services/players';
import {BoardService} from './services/board';
import {GameplayService} from './services/gameplay';

export type GameInit = {
  board: IBoard;
  players: IPlayer[];
  gameplay: IGameplay;
};

export class GameFacade {
  private readonly eventEmitter: EventEmitter;
  private readonly playersService: PlayersService;
  private readonly boardService: BoardService;
  private readonly gameplayService: GameplayService;

  constructor(params: GameInit) {
    const {gameplay, players, board} = params;

    this.eventEmitter = new EventEmitter();
    this.playersService = new PlayersService(players);
    this.boardService = new BoardService(board, this.eventEmitter);
    this.gameplayService = new GameplayService(gameplay, this.eventEmitter);
  }

  public get view(): Readonly<BoardState> {
    return this.boardService.getView();
  }

  public hidePossibleMoves(): void {
    this.boardService.hidePossibleMoves();
  }

  public showPossibleMoves(color: PlayerColor, point: PointState): void {
    const player = this.playersService.getPlayer(color);

    this.boardService.showPossibleMoves(player, new Point(point));
  }

  public move(color: PlayerColor, move: Move): void {
    const player = this.playersService.getPlayer(color);

    this.gameplayService.move(player, move);
  }

  public subscribe<T extends Event>(event: T, callback: Callback<T>): void {
    this.eventEmitter.subscribe(event, callback);
  }

  public unsubscribe<T extends Event>(event: T, callback: Callback<T>): void {
    this.eventEmitter.unsubscribe(event, callback);
  }
}
