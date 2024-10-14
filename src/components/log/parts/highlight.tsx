import { ReactNode } from 'react';
import { TObjString } from 'utils/types/common';

function Highlight({ color = '', children }: { color?: string, children?: ReactNode }) {
  const c = highlightColors[color];
  let className = `c-highlight--${c}`;
  if (c === 'white') className += ' u-text-shadow';

  return <span className={className}>{children}</span>;
}

export default Highlight;

const highlightColors: TObjString = {
  '': 'orange',
  'g': 'upgraded-green',
  'a': 'blue',
  'u': 'ui-red',
  'd': 'transparent',
  'p': 'purple',
  'e': 'lightblue',
  'f': 'green',
  'r': 'red',
  'c': 'cyan',
  'b': 'royalblue'
};

export {
  highlightColors
};