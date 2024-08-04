import { TStation } from 'utils/types';

function Station({ station }: { station: TStation }) {
  return (
    <>
      {station.Type}
    </>
  );
}

export default Station;