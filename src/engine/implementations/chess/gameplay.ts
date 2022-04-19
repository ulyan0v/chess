import type {IGameplay, Move} from '../../entities/gameplay';
import type {IPlayer} from '../../entities/player';
import type {IBoard} from '../../entities/board';
import {Actions} from './actions';

export class Gameplay implements IGameplay {
  private readonly board: IBoard;
  private readonly players: IPlayer[];
  // private readonly eventEmitter: EventEmitter;

  private makesMove: IPlayer;

  constructor(players: IPlayer[], board: IBoard) {
    this.board = board;
    this.players = players;

    this.makesMove = players[0];
  }

  public makeMove(player: IPlayer, move: Move): void {
    if (!this.canMove(player))
      throw new Error(`${player.color} player cannot make a move`);

    switch (move.action) {
      case Actions.Move:
        this.move(move);
        break;

      case Actions.Hit:
        this.move(move);
        break;

      case Actions.Castling:
        this.castling(move);
        break;

      // TODO: Add other rules

      default:
        throw new Error(`Unknown action "${move.action}"`);
    }

    this.passMove();
  }

  private canMove(player: IPlayer): boolean {
    return this.makesMove === player;
  }

  private passMove(): void {
    const maxIndex = this.players.length - 1;
    const currentIndex = this.players.findIndex((player) => {
      return this.makesMove === player;
    });

    const nextIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;

    this.makesMove = this.players[nextIndex];
  }

  private move({from, to}: Move): void {
    const cell = this.board.findCell(from);
    const piece = cell?.piece;

    if (!piece) throw new Error(`Target not found`);

    this.board.update(from, {piece: null});
    this.board.update(to, {piece});
  }

  private castling(move: Move) {
    throw new Error('Implement me');
  }
}
