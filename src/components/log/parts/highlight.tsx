import { ReactNode } from 'react';
import { TObjString } from 'utils/types/common';

function Highlight({ color = '', children }: { color?: string, children?: ReactNode }) {
  const colors: TObjString = {
    '': 'orange',
    'g': 'green',
    'a': 'blue',
    'u': 'red',
    'd': 'white',
    'p': 'purple',
    'e': 'lightblue'
  };
  const c = colors[color];
  let className = `c-highlight--${c}`;
  if (c === 'white') className += ' u-text-shadow';

  return <span className={className}>{children}</span>;
}

export default Highlight;