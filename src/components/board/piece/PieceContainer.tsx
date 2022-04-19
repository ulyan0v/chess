import React, {FC} from 'react';
import {observer} from 'mobx-react';
import type {Piece as PieceType} from '../../../shared/types/ui';
import {Piece} from './Piece';
import {useStore} from '../../../shared/hooks/useStore';

export type FigureContainerProps = {
  data: PieceType;
};

export const PieceContainer: FC<FigureContainerProps> = observer(({data}) => {
  const {game, assets} = useStore();

  const handleSelect = () => {
    game.togglePieceSelect(data);
  };

  return (
    <Piece
      data={data}
      img={assets.getPieceImage(data)}
      onSelect={handleSelect}
    />
  );
});
