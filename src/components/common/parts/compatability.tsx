import { Trans } from 'react-i18next';
import ExternalLink from './externalLink';
import { steamWorkshopUrl, thunderstoreUrl } from 'configs/globals';
import { ReactNode } from 'react';

function Compatability() {
  return (
    <Trans
      i18nKey="compatability"
      ns="site"
      components={{ mod: <Mod /> }}
    />
  );
}

function Mod({ children }: { children?: ReactNode }) {
  return (
    <>
      <ExternalLink href={steamWorkshopUrl} type="steam">
        {children}
      </ExternalLink>
      <ExternalLink href={thunderstoreUrl} type="thunderstore" />
    </>
  );
}

export default Compatability;