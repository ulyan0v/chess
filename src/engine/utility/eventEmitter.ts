import type {BoardState} from '../entities/board';
import type {IPiece} from '../entities/piece';
import type {Move} from '../entities/gameplay';

type EventTypes = {
  move: Move;
  boardUpdate: Readonly<BoardState>;
  pieceDestroyed: IPiece;
};

export type Event = keyof EventTypes;

export type Callback<T extends Event> = (data: EventTypes[T]) => void;

type Subscribers = {
  [T in Event]: Array<Callback<T>>;
};

export class EventEmitter {
  private readonly subscribers: Subscribers = {
    move: [],
    boardUpdate: [],
    pieceDestroyed: [],
  };

  public emit<T extends Event>(event: T, data: EventTypes[T]): void {
    for (const callback of this.subscribers[event]) {
      callback(data);
    }
  }

  public subscribe<T extends Event>(event: T, callback: Callback<T>): void {
    this.subscribers[event].push(callback);
  }

  public unsubscribe<T extends Event>(event: T, subscriber: Callback<T>): void {
    this.subscribers[event] = this.subscribers[event].filter((callback) => {
      return callback !== subscriber;
    }) as Subscribers[T];
  }
}
