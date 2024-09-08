import { Trans, useTranslation } from 'react-i18next';

function IsAutoSeedWidget({ is }: { is: boolean }) {
  useTranslation();

  return (
    <span className="c-is-auto-seed">
      <Trans
        i18nKey="IsAutoSeed"
        ns="log"
        context={is.toString()}
      />
    </span>
  );
}

export default IsAutoSeedWidget;