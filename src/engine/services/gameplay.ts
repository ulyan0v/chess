import type {IGameplay, Move} from '../entities/gameplay';
import type {EventEmitter} from '../utility/eventEmitter';
import type {IPlayer} from '../entities/player';

export class GameplayService {
  private readonly gameplay: IGameplay;
  private readonly eventEmitter: EventEmitter;

  constructor(gameplay: IGameplay, eventEmitter: EventEmitter) {
    this.gameplay = gameplay;
    this.eventEmitter = eventEmitter;
  }

  public move(player: IPlayer, move: Move) {
    this.gameplay.makeMove(player, move);

    this.eventEmitter.emit('move', move);
  }
}
