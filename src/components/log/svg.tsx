import { TActObj } from 'utils/types';

function Svg({ ActObj }: { ActObj: TActObj }) {
  const { Act, Nodes } = ActObj;

  const size = 40;
  const padding = 8;
  const diff = size + padding * 2;

  const length = 24;
  // const diagonal = 32;
  const width = 2;
  const color = 'black';

  const lines = Nodes.map((node) => {
    const { X, Y, Followers} = node;
    return Followers.map((follower) => {
      if (follower !== Y) return null;
      const x1 = 0 + X * diff;
      const y1 = 0 + Y * diff;
      const x2 = x1 + length;
      const y2 = y1 + length;
      return (
        <line key={`Act${Act}_x${X}_y${Y}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} stroke-width={width}></line>
      );
    });
  });

  return (
    <svg>
      {lines}
    </svg>
  );
}

export default Svg;