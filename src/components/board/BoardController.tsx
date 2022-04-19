import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {useStore} from '../../shared/hooks/useStore';
import {Board} from './Board';

export const BoardController: FC = observer(() => {
  const {game} = useStore();

  return <Board board={game.view} />;
});
