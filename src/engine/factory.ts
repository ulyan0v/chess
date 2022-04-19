import {GameFacade} from './facade';
import {Board, Player} from './implementations/common';
import {startPosition, Colors, Gameplay} from './implementations/chess';

export enum Game {
  Chess,
}

export class GameFactory {
  public static newGame(game: Game): GameFacade {
    switch (game) {
      case Game.Chess: {
        const board = new Board(startPosition);
        const players = [
          new Player(Colors.White, {x: 0, y: -1}),
          new Player(Colors.Black, {x: 0, y: 1}),
        ];

        return new GameFacade({
          players,
          board,
          gameplay: new Gameplay(players, board),
        });
      }

      default:
        throw new Error('Game not found');
    }
  }
}
