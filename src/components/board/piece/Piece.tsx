import React, {FC} from 'react';
import styled from '@emotion/styled';
import type {Piece as PieceType} from '../../../shared/types/ui';

export type PieceProps = {
  data: PieceType;
  img: string;
  onSelect(): void;
};

export const Piece: FC<PieceProps> = ({data, img, onSelect}) => {
  return <PieceView draggable alt={data.name} src={img} onClick={onSelect} />;
};

const PieceView = styled.img({
  height: '100%',
  cursor: 'pointer',
});
