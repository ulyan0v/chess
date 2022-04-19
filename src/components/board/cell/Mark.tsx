import React, {FC, DetailedHTMLProps, HTMLAttributes} from 'react';
import styled from '@emotion/styled';

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface MarkProps extends DivProps {
  type: 'dot' | 'circle';
}

export const Mark: FC<MarkProps> = ({type, ...rest}) => {
  return type === 'dot' ? <Dot {...rest} /> : <Circle {...rest} />;
};

const Dot = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:after': {
    content: '""',
    display: 'block',
    width: '35%',
    height: '35%',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
});

const Circle = styled.div({
  border: '8px solid rgba(0, 0, 0, .15)',
  borderRadius: '50%',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});
