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

  return <span className={`c-highlight--${colors[color]}`}>{children}</span>;
}

export default Highlight;