export type PointState = {x: number; y: number};

export class Point implements PointState {
  public readonly x: number;
  public readonly y: number;

  constructor({x, y}: PointState) {
    this.x = x;
    this.y = y;
  }

  public add({x, y}: PointState): Point {
    return new Point({
      x: this.x + x,
      y: this.y + y,
    });
  }

  public multiply(multiplier: number): Point {
    return new Point({
      x: this.x * multiplier,
      y: this.y * multiplier,
    });
  }

  public isEqual({x, y}: PointState): boolean {
    return this.x === x && this.y === y;
  }
}
