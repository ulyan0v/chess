import React, {FC} from 'react';
import styled from '@emotion/styled';
import {Piece} from '../piece';
import {Mark} from './Mark';
import type {Nullable} from '../../../shared/types/utility';
import type {
  CellView as CellViewType,
  HexColor,
} from '../../../shared/types/ui';

export interface CellProps {
  data: Nullable<CellViewType>;
  color: HexColor;
  onMarkClick(): void;
}

export const Cell: FC<CellProps> = ({data, color, onMarkClick}) => {
  return (
    <CellView data-color={data && color}>
      {data?.piece && <Piece data={data.piece} />}
      {data?.action && (
        <Mark type={data.piece ? 'circle' : 'dot'} onClick={onMarkClick} />
      )}
    </CellView>
  );
};

type CellAttributes = {'data-color'?: Nullable<HexColor>};
const CellView = styled.div<CellAttributes>((props) => ({
  position: 'relative',
  backgroundColor: props['data-color'] || 'transparent',
}));
