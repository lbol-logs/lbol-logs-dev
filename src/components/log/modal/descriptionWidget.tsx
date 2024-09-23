import BaseManaWidget from 'components/common/parts/baseManaWidget';
import { MoneyImage, PowerImage } from '../stations/parts/stationWidgets';
import Highlight from 'components/log/parts/highlight';
import { Trans, useTranslation } from 'react-i18next';
import { TCard, TExhibit, THolding, TStatusEffect } from 'utils/types/runData';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import CharacterShortName from '../stations/parts/characterShortName';
import CardManasWidget from './cardManasWidget';

function Desc({ v }: { v: string | number | undefined }) {
  if (v === undefined) return <></>;
  return (
    <span className="p-modal__variable">{v}</span>
  );
}

function DescriptionWidget({ ns, ...o }: { ns: string }) {
  const { configsData, act, level, holdings } = useContext(LogContext);
  const { t } = useTranslation();

  const {
    Id,
    IsUpgraded,
    Level, Duration, Count, Limit, owner
  } = o as TCard & TExhibit & TStatusEffect;

  const isCard = ns === 'cards';
  const isExhibit = ns === 'exhibits';
  const isStatusEffect = ns === 'statusEffects';
  const config = configsData[ns][Id] || {};
  const { Version } = config;

  const array = [Id];
  if (IsUpgraded !== undefined) array.push(IsUpgraded.toString());
  if (isStatusEffect && Id === 'TianziRockSe' && Limit === 1) {
    array.push('ExtraDescription');
  }
  else {
    array.push('Description');
  }
  const key = array.join('.');

  const isPlayer = [undefined, 'Player'].includes(owner);
  const OwnerName = isPlayer ? <CharacterShortName /> : <>{t(owner as string, { ns: 'units' })}</>;

  const components = {
    h: <Highlight>{}</Highlight>,
    ha: <Highlight color="a">{}</Highlight>,
    hu: <Highlight color="u">{}</Highlight>,
    hd: <Highlight color="d">{}</Highlight>,
    hp: <Highlight color="p">{}</Highlight>,
    l: <span className="c-dialogue__height">{}</span>,
    Money: <MoneyImage />,
    Power: <PowerImage />,
    Mana1: <BaseManaWidget mana="C" />,
    Manap: <BaseManaWidget mana="P" />,
    OwnerName,
    PlayerName: <CharacterShortName />,
    Level: <Desc v={Level} />,
    Duration: <Desc v={Duration} />,
    Count: <Desc v={Count} />,
    Limit: <Desc v={Limit} />
  };

  if (isStatusEffect) {
    const {
      SourceCard,
      Value,
      Mana,
      DamageRate
    } = config;

    if (SourceCard) {
      const name = t(SourceCard, { ns: 'cards' });
      const SourceCardName = <Desc v={name} />;
      Object.assign(components, { SourceCardName });
    }

    if (Value) {
      let v = Value;
      const { Extra } = config;
      if (Extra) {
        const { Exhibit, Enemy, Player } = Extra;
        const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;
        const hasExhibit = currentHolding.Exhibits.find(({ Id }) => Id === Exhibit);
        if (hasExhibit) v += isPlayer ? Player : Enemy;
      }
      Object.assign(components, { Value: <Desc v={v} /> });
    }

    {
      const mana = Mana === undefined ? (Level === undefined ? (Limit || 0) : Level) : Mana;
      Object.assign(components, { Mana: <CardManasWidget cardMana={mana} /> });
    }

    if (DamageRate) {
      Object.assign(components, { DamageRate: <Desc v={DamageRate} /> });
    }
  }

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