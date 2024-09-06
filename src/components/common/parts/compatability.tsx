import { Trans } from 'react-i18next';
import ExternalLink from './externalLink';
import { modUrl } from 'configs/globals';

function Compatability() {
  return (
    <Trans
      i18nKey="compatability"
      ns="site"
      components={{ mod: <ExternalLink href={modUrl} /> }}
    />
  );
}

export default Compatability;