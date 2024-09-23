import ManaWidget from 'components/common/parts/manaWidget';
import { MoneyImage, PowerImage } from '../stations/parts/stationWidgets';
import Highlight from 'components/log/parts/highlight';
import { Trans, useTranslation } from 'react-i18next';
import { TCard, TExhibit, TStatusEffect } from 'utils/types/runData';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';

function DescriptionWidget({ ns, ...o }: { ns: string }) {
  const { runData } = useContext(LogContext);
  const { t } = useTranslation();

  const {
    Id,
    IsUpgraded,
    Level, Duration, Count, Limit
  } = o as TCard & TExhibit & TStatusEffect;

  const context = IsUpgraded === undefined ? '' : IsUpgraded.toString();

  const { Settings: { Character } } = runData;
  const PlayerName = t(Character, { ns: 'units', context: 'short' });

  const components = {
    h: <Highlight>{}</Highlight>,
    ha: <Highlight color="a">{}</Highlight>,
    hu: <Highlight color="u">{}</Highlight>,
    hd: <Highlight color="d">{}</Highlight>,
    hp: <Highlight color="p">{}</Highlight>,
    l: <span className="c-dialogue__height">{}</span>,
    Money: <MoneyImage />,
    Power: <PowerImage />,
    Mana1: <ManaWidget mana="C" />,
    Manap: <ManaWidget mana="P" />,
    PlayerName,
    Level, Duration, Count, Limit
  };

  return (
    <Trans
      i18nKey={`${Id}.Description`}
      ns={ns}
      context={context}
      components={components}
    />
  );
}

export default DescriptionWidget;