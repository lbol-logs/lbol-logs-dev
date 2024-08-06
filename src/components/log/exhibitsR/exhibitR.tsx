import { TExhibit } from 'utils/types/runData';

function ExhibitR({ exhibit }: { exhibit: TExhibit }) {
  const Id = exhibit;

  return (
    <span className={`c-exhibit`}>
      {Id}
    </span>
  );
}

export default ExhibitR;