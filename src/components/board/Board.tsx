import React, {FC} from 'react';
import styled from '@emotion/styled';
import type {BoardView, HexColor} from '../../shared/types/ui';
import {Cell} from './cell';

export interface BoardProps {
  board: Readonly<BoardView>;
}

export const Board: FC<BoardProps> = ({board}) => {
  const getCellColor = (x: number, y: number): HexColor => {
    return (x + y) % 2 === 0 ? '#eeeed2' : '#769655';
  };

  return (
    <BoardWrapper>
      {board.map((row, rowIndex) => (
        <Row key={rowIndex} data-size={row.length}>
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              data={cell}
              color={getCellColor(rowIndex, cellIndex)}
            />
          ))}
        </Row>
      ))}
    </BoardWrapper>
  );
};

const BoardWrapper = styled.main({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

type RowAttributes = {'data-size': number};
const Row = styled.div<RowAttributes>((props) => {
  const size = `${(100 - 10) / props['data-size']}vmin`;

  return {
    display: 'flex',
    flex: 1,
    '& > div': {
      width: size,
      height: size,
      fontSize: `calc(${size} * 0.9)`,
    },
  };
});
