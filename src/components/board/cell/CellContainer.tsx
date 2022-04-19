import React, {FC} from 'react';
import {Cell, CellProps} from './Cell';
import {useStore} from '../../../shared/hooks/useStore';

export type CellContainerProps = Omit<CellProps, 'onMarkClick'>;

export const CellContainer: FC<CellContainerProps> = (props) => {
  const {game} = useStore();

  const onMarkClick = () => {
    if (props.data?.action) game.move(props.data.position, props.data.action);
  };

  return <Cell {...props} onMarkClick={onMarkClick} />;
};
