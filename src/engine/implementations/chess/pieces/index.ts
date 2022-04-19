import {pieceBuilder} from '../../../utility/pieceBuilder';
import {King} from './king';
import {Queen} from './queen';
import {Rook} from './rook';
import {Bishop} from './bishop';
import {Knight} from './knight';
import {Pawn} from './pawn';

export const king = pieceBuilder(King);
export const queen = pieceBuilder(Queen);
export const rook = pieceBuilder(Rook);
export const bishop = pieceBuilder(Bishop);
export const knight = pieceBuilder(Knight);
export const pawn = pieceBuilder(Pawn);

export * from './king';
export * from './queen';
export * from './rook';
export * from './bishop';
export * from './knight';
export * from './pawn';
