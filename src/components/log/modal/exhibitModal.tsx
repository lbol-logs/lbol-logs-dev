import { TExhibit } from 'utils/types/runData';

function ExhibitModal({ exhibit }: { exhibit: TExhibit }) {
  const inner = (
    <div style={{height:'1000px',border:'1px solid'}}>
    </div>
  );

  return (
    <div className="p-modal__exhibit">
      {inner}
    </div>
  );
}

export default ExhibitModal;