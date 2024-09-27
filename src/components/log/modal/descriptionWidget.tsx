import { MoneyImage, PowerImage } from '../stations/parts/stationWidgets';
import Highlight from 'components/log/parts/highlight';
import { Trans, useTranslation } from 'react-i18next';
import { TCard, TExhibitObj, THolding, TStatusEffect } from 'utils/types/runData';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import CharacterShortName from '../stations/parts/characterShortName';
import CardManasWidget from './cardManasWidget';
import CardManaWidget from './cardManaWidget';
import { TObjElement, TObjAny } from 'utils/types/common';
import BaseManasWidget from 'components/common/parts/baseManasWidget';
import { configsData } from 'configs/globals';

function DescriptionWidget({ ns, ...o }: { ns: string }) {
  const { exhibitsConfigs } = configsData;
  const { configsData: { cards, statusEffects }, act, level, holdings } = useContext(LogContext);
  const { t } = useTranslation();

  const components = {
    h: <Highlight>{}</Highlight>,
    ha: <Highlight color="a">{}</Highlight>,
    hu: <Highlight color="u">{}</Highlight>,
    hd: <Highlight color="d">{}</Highlight>,
    hp: <Highlight color="p">{}</Highlight>,
    he: <Highlight color="e">{}</Highlight>,
    Money: <MoneyImage />,
    Power: <PowerImage />,
    Mana1: <CardManaWidget mana="1" />,
    ManaP: <CardManaWidget mana="P" />,
    ManaC: <CardManaWidget mana="C" />,
    PlayerName: <CharacterShortName />
  };

  const values = {};

  let Version;
  const keys: Array<string> = [];
  const c = new Components(components);

  switch (ns) {
    case 'cards': {
      const {
        Id, IsUpgraded
      } = o as TCard;
      const config = cards[Id];

      ({ Version } = config);

      if (IsUpgraded) {
        const array = [Id, true, 'Description'];
        keys.push(array.join('.'));
      }

      const array = [Id, false, 'Description'];
      keys.push(array.join('.'));

      break;
    }
    case 'exhibits': {
      const { Id, Counter } = o as TExhibitObj;
      const config = exhibitsConfigs.get(Id);

      ({ Version } = config);
      const array = [Id, 'Description'];
      keys.push(array.join('.'));

      const { Value1, Value2, Value3, Mana, BaseMana, InitialCounter } = config;

      const args = { Value1, Value2, Value3, InitialCounter };
      c.appendDescs(args);
      c.insert('Mana', <CardManasWidget cardMana={Mana} />);
      c.insert('BaseMana', <BaseManasWidget baseMana={BaseMana} />);
      c.insert('Counter', <Desc value={Counter} />);

      break;
    }
    case 'statusEffects': {
      const { Id, Level, Duration, Count, Limit, owner } = o as TStatusEffect;
      const config = statusEffects[Id] || {};

      ({ Version } = config);
      const array = [Id];
      if (Id === 'TianziRockSe' && Limit === 1) array.push('ExtraDescription');
      else array.push('Description');
      keys.push(array.join('.'));

      const isPlayer = [undefined, 'Player'].includes(owner);

      {
        const OwnerName = isPlayer ? <CharacterShortName /> : <>{t(owner as string, { ns: 'units' })}</>;
        c.insertObj({ OwnerName });
        const args = { Level, Duration, Count, Limit: Limit || 0 };
        c.appendDescs(args);
        Object.assign(values, args);
      }

      const { Value, Mana, DamageRate, TriggerLevel, BaseDamage, StackMultiply, SourceCardName, Block } = config;

      if (Value !== undefined) {
        let v = Value;
        const { Extra } = config;
        if (Extra) {
          const { Exhibit, Enemy, Player } = Extra;
          const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;
          const hasExhibit = currentHolding.Exhibits.find(({ Id }) => Id === Exhibit);
          if (hasExhibit) v += isPlayer ? Player : Enemy;
        }
        c.insert('Value', <Desc value={v} />);
      }

      const mana = Mana === undefined ? (Level === undefined ? (Limit || 0) : Level) : Mana;
      c.insert('Mana', <CardManasWidget cardMana={mana} />);

      {
        const StackDamage = StackMultiply === undefined ? undefined : (BaseDamage * StackMultiply);
        const args = { DamageRate, TriggerLevel, BaseDamage, StackMultiply, StackDamage, Block };
        c.appendDescs(args);
      }

      if (Id === 'ExtraBlizzard') {
        c.insert('Damage', <Desc value={Level} />);
      }
      if (SourceCardName !== undefined) {
        const name = t(`${SourceCardName}.Name`, { ns: 'cards' });
        c.insert('SourceCardName', <Desc value={name} />);
      }
      if (Id === 'MeihongPowerSe') {
        const Heal = Level as number * 2;
        c.insert('Heal', <Desc value={Heal} />);
      }
      if (Id === 'SeeFengshuiSe') {
        c.insert('Scry', <Desc value={Level} />);
      }

      break;
    }
  }

  return (
    <Trans context={Version} components={components} values={values}>
      {t(keys, { ns })}
    </Trans>
  );
}

export default DescriptionWidget;

function Desc({ value }: { value: string | number | undefined }) {
  if (value === undefined) return <></>;
  return (
    <span className="p-modal__variable">{value}</span>
  );
}

class Components {
  private _components: TObjElement;

  constructor(components: TObjElement) {
    this._components = components;
  }

  insertObj(o: TObjElement) {
    const [id, component] = Object.entries(o)[0];
    this.insert(id, component);
  }

  insert(id: string, component: JSX.Element) {
    this._components[id] = component;
  }

  appendDescs(o: TObjAny) {
    for (const [id, value] of Object.entries(o)) {
      this.appendDesc(id, value);
    }
  }

  appendDesc(id: string, value: any) {
    if (value === undefined) return;
    const component = <Desc value={value} />;
    this.insert(id, component);
  }
}