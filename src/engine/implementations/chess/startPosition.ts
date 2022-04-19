import {createBoardState, InitPiece} from '../../utility/boardState';
import {bishop, king, knight, pawn, queen, rook} from './pieces';
import {Colors} from './colors';

const blackStartedPosition: InitPiece[] = [
  rook({x: 0, y: 0}, Colors.Black),
  knight({x: 1, y: 0}, Colors.Black),
  bishop({x: 2, y: 0}, Colors.Black),
  queen({x: 3, y: 0}, Colors.Black),
  king({x: 4, y: 0}, Colors.Black),
  bishop({x: 5, y: 0}, Colors.Black),
  knight({x: 6, y: 0}, Colors.Black),
  rook({x: 7, y: 0}, Colors.Black),
  ...[...Array(8)].map((_, index) => pawn({x: index, y: 1}, Colors.Black)),
];

const whiteStartedPosition: InitPiece[] = [
  rook({x: 0, y: 7}, Colors.White),
  knight({x: 1, y: 7}, Colors.White),
  bishop({x: 2, y: 7}, Colors.White),
  queen({x: 3, y: 7}, Colors.White),
  king({x: 4, y: 7}, Colors.White),
  bishop({x: 5, y: 7}, Colors.White),
  knight({x: 6, y: 7}, Colors.White),
  rook({x: 7, y: 7}, Colors.White),
  ...[...Array(8)].map((_, index) => pawn({x: index, y: 6}, Colors.White)),
];

export const startPosition = createBoardState([
  ...whiteStartedPosition,
  ...blackStartedPosition,
]);
