import { ReactNode } from 'react';
import { TObjString } from 'utils/types/common';

function Highlight({ color = '', children }: { color?: string, children?: ReactNode }) {
  const colors: TObjString = {
    '': 'orange',
    'g': 'upgraded-green',
    'a': 'blue',
    'u': 'ui-red',
    'd': 'transparent',
    'p': 'purple',
    'e': 'lightblue',
    'f': 'green',
    'r': 'red',
    'c': 'cyan'
  };
  const c = colors[color];
  let className = `c-highlight--${c}`;
  if (c === 'white') className += ' u-text-shadow';

  return <span className={className}>{children}</span>;
}

export default Highlight;