import type {IPlayer, PlayerColor} from '../entities/player';

export class PlayersService {
  private readonly players: IPlayer[];

  constructor(players: IPlayer[]) {
    this.players = players;
  }

  public getPlayer(color: PlayerColor): IPlayer {
    const player = this.players.find((player) => player.color === color);

    if (!player) throw new Error(`${color} player not found`);

    return player;
  }
}
