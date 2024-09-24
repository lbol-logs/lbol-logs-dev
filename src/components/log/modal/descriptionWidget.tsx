import { MoneyImage, PowerImage } from '../stations/parts/stationWidgets';
import Highlight from 'components/log/parts/highlight';
import { Trans, useTranslation } from 'react-i18next';
import { TCard, TExhibit, THolding, TStatusEffect } from 'utils/types/runData';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import CharacterShortName from '../stations/parts/characterShortName';
import CardManasWidget from './cardManasWidget';
import CardManaWidget from './cardManaWidget';
import { CommonContext } from 'contexts/commonContext';
import { TObjAny } from 'utils/types/common';

function Desc({ v }: { v: string | number | undefined }) {
  if (v === undefined) return <></>;
  return (
    <span className="p-modal__variable">{v}</span>
  );
}

function DescriptionWidget({ ns, ...o }: { ns: string }) {
  const { configsData: { exhibits } } = useContext(CommonContext);
  const { configsData: { cards, statusEffects }, act, level, holdings } = useContext(LogContext);
  const { t } = useTranslation();

  const {
    Id,
    IsUpgraded,
    Level, Duration, Count, Limit, owner
  } = o as TCard & TExhibit & TStatusEffect;

  const isCard = ns === 'cards';
  const isExhibit = ns === 'exhibits';
  const isStatusEffect = ns === 'statusEffects';

  const configs = { cards, exhibits, statusEffects }[ns] as TObjAny;
  const config = configs[Id] || {};
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
    Mana1: <CardManaWidget mana="1" />,
    ManaP: <CardManaWidget mana="P" />,
    OwnerName,
    PlayerName: <CharacterShortName />,
    Level: <Desc v={Level} />,
    Duration: <Desc v={Duration} />,
    Count: <Desc v={Count} />,
    Limit: <Desc v={Limit} />
  };

  const values = {
    Level, Duration, Count, Limit
  };

  if (isStatusEffect) {
    const {
      SourceCard,
      Value,
      Mana,
      DamageRate,
      TriggerLevel,
      BaseDamage,
      StackMultiply,
      SourceCardName,
      Block
    } = config;

    if (SourceCardName) {
      const name = t(SourceCardName, { ns: 'cards' });
      Object.assign(components, { SourceCardName: <Desc v={name} /> });
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

    if (Id === 'ExtraBlizzard') {
      Object.assign(components, { Damage: <Desc v={Level} /> });
    }

    if (TriggerLevel) {
      Object.assign(components, { TriggerLevel: <Desc v={TriggerLevel} /> });
    }

    if (BaseDamage) {
      Object.assign(components, { BaseDamage: <Desc v={BaseDamage} /> });
    }

    if (Id === 'Cold') {
      const StackDamage = BaseDamage * StackMultiply;
      Object.assign(components, { StackMultiply: <Desc v={StackMultiply} />, StackDamage: <Desc v={StackDamage} /> });
    }

    if (Id === 'MeihongPowerSe') {
      const Heal = Level as number * 2;
      Object.assign(components, { Heal: <Desc v={Heal} /> });
    }

    if (Id === 'SeeFengshuiSe') {
      Object.assign(components, { Scry: <Desc v={Level} /> });
    }

    if (Block) {
      Object.assign(components, { Block: <Desc v={Block} /> });
    }
  }

  return (
    <Trans
      i18nKey={key}
      ns={ns}
      context={Version}
      components={components}
      values={values}
    />
  );
}

export default DescriptionWidget;