import { Trans, useTranslation } from 'react-i18next';

function ReloadTimesWidget({ count }: { count: number }) {
  useTranslation();

  return (
    <span className="c-reload-times">
      <Trans
        i18nKey="ReloadTimes"
        ns="log"
        count={count}
      />
    </span>
  );
}

export default ReloadTimesWidget;