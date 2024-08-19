import { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';

function GapDescription({ desc, children }: { desc: string, children?: ReactNode }) {
  useTranslation();

  return (
    <p className="p-gap-choice__desc" key={desc}>
      <Trans
        i18nKey={desc}
        ns="gap"
      />
      {children}
    </p>
  )
}

export default GapDescription;