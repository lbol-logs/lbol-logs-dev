import ExternalLink from 'components/common/parts/externalLink';
import { TWebsite } from 'utils/types/runData';

function LogWebsite({ website }: { website: TWebsite | undefined }) {
  if (website === undefined) return null;

  const { Title, Url } = website;

  return (
    <div className="p-website">
      <span className="p-website__head">Website: </span>
      <ExternalLink href={Url}>{Title}</ExternalLink>
    </div>
  );
}

export default LogWebsite;