import styled from 'styled-components';

const Ellipsis = styled.div`
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  text-overflow: ellipsis;
  width: ${({ width }) => width};
`;

export const SingleLineEllipsis = Ellipsis.extend`
  white-space: nowrap;
`;

export const MultiLineEllipsis = Ellipsis.extend`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ line }) => line};
`;
