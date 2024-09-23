import ManaWidget from 'components/common/parts/manaWidget';
import { MoneyImage, PowerImage } from '../stations/parts/stationWidgets';
import Highlight from 'components/log/parts/highlight';
import { Trans, useTranslation } from 'react-i18next';
import { TCard, TExhibit, TStatusEffect } from 'utils/types/runData';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import CharacterShortName from '../stations/parts/characterShortName';

function Desc({ v }: { v: string | number | undefined }) {
  if (v === undefined) return <></>;
  return (
    <span className="p-modal__variable">{v}</span>
  );
}

function DescriptionWidget({ ns, ...o }: { ns: string }) {
  const { configsData } = useContext(LogContext);
  const { t } = useTranslation();

  const {
    Id,
    IsUpgraded,
    Level, Duration, Count, Limit, owner
  } = o as TCard & TExhibit & TStatusEffect;

  const ug = IsUpgraded === undefined ? '' : `.${IsUpgraded}`;
  const key = `${Id}${ug}.Description`;

  const isCard = ns === 'cards';
  const isExhibit = ns === 'exhibits';
  const isStatusEffect = ns === 'statusEffects';
  const config = configsData[ns][Id] || {};
  const { Version } = config;

  const OwnerName = [undefined, 'Player'].includes(owner) ? <CharacterShortName /> : <>{t(owner as string, { ns: 'units' })}</>;
  let SourceCardName = <></>;
  if (isStatusEffect) {
    const { SourceCard } = config;
    const name = t(SourceCard, { ns: 'cards' });
    SourceCardName = <Desc v={name} />;
  }

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
    OwnerName,
    PlayerName: <CharacterShortName />,
    SourceCardName,
    Level: <Desc v={Level} />,
    Duration: <Desc v={Duration} />,
    Count: <Desc v={Count} />,
    Limit: <Desc v={Limit} />
  };

  return (
    <Trans
      i18nKey={key}
      ns={ns}
      context={Version}
      components={components}
    />
  );
}

export default DescriptionWidget;