import {makeAutoObservable} from 'mobx';
import {AssetsController} from './controllers/assetsController';
import {GameController} from './controllers/gameController';
import {Games, Game} from '../engine';

export class Store {
  public readonly assets = new AssetsController();
  public readonly game = new GameController(Games.newGame(Game.Chess));

  constructor() {
    makeAutoObservable(this);
  }
}
