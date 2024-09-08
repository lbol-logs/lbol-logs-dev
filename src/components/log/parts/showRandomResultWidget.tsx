import { Trans, useTranslation } from 'react-i18next';

function ShowRandomResultWidget({ show }: { show: boolean }) {
  useTranslation();

  return (
    <span className="c-show-random-result u-text-shadow">
      <Trans
        i18nKey="ShowRandomResult"
        ns="log"
        context={show.toString()}
      />
    </span>
  );
}

export default ShowRandomResultWidget;