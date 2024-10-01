import { MoneyImage, PowerImage } from '../stations/parts/stationWidgets';
import Highlight, { highlightColors } from 'components/log/parts/highlight';
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
import CMana from 'utils/classes/CMana';

function DescriptionWidget({ ns, prefix = '', ...o }: { ns: string, prefix?: string }) {
  const { exhibitsConfigs, cardsConfigs, statusEffectsConfigs } = configsData;
  const { act, level, holdings } = useContext(LogContext);
  const { t, i18n } = useTranslation();

  const components: TObjElement = {
    Money: <MoneyImage />,
    Power: <PowerImage />,
    PlayerName: <CharacterShortName />
  };
  for (const color in highlightColors) components[`h${color}`] = <Highlight color={color}>{}</Highlight>;
  for (const mana of '1WUBRGCP') components[`Mana${mana}`] = <CardManaWidget mana={mana} />;
  const enemies = ['FraudRabbit', 'LoveGirl', 'Long'];
  for (const enemy of enemies) components[enemy] = <span className={`c-enemy--${enemy}`}>{}</span>;

  const values = {};

  let Version;
  const keys: Array<string> = [];
  const c = new Components(components);

  function addKey(id: string, prefix: string) {
    keys.push(`${id}.${prefix}Description`);
  }

  switch (ns) {
    case 'cards': {
      const card = o as TCard;
      const {
        Id, IsUpgraded
      } = card;
      const config = cardsConfigs.get(card);
      const cardConfigs = config.getAll();

      ({ Version } = cardConfigs);

      if (IsUpgraded) addKey(Id, `Upgraded${prefix}`);
      addKey(Id, prefix);

      const { Damage, Block, Shield, Value1, Value2, Mana, Scry, Power, Graze  } = cardConfigs;

      const args = { Damage, Block, Shield, Value1, Value2, Scry, P: Power, Graze };
      c.appendDescs(args);
      // Object.assign(values, args);
      if (Mana !== undefined) c.insert('Mana', <CardManasWidget cardMana={Mana} />);

      c.insert('SelfName', <span className="c-self-name">{t(`${Id}.Name`, { ns })}</span>)

      break;
    }
    case 'exhibits': {
      const { Id, Counter } = o as TExhibitObj;
      const config = exhibitsConfigs.get(Id);

      ({ Version } = config);
      addKey(Id, prefix);

      const { Value1, Value2, Value3, Mana, BaseMana, InitialCounter } = config;
      const counter = Counter === undefined ? InitialCounter : Counter;

      const args = { Value1, Value2, Value3, Counter: counter, InitialCounter };
      c.appendDescs(args);
      Object.assign(values, args);
      if (Mana !== undefined) c.insert('Mana', <CardManasWidget cardMana={new CMana(Mana).manas} />);
      if (BaseMana !== undefined) c.insert('BaseMana', <BaseManasWidget baseMana={BaseMana} />);

      break;
    }
    case 'statusEffects': {
      const { Id, Level, Duration, Count, Limit, owner } = o as TStatusEffect;
      const config = statusEffectsConfigs.get(Id) || {};

      ({ Version } = config);
      if (Id === 'TianziRockSe' && Limit === 1) prefix = 'Extra';
      addKey(Id, prefix);

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
      if (Mana !== undefined) c.insert('Mana', <CardManasWidget cardMana={new CMana(mana).manas} />);

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

  let key = keys[0];
  for (let i = 1; i < keys.length; i++) {
    if (!i18n.exists(key, { ns })) key = keys[i];
    else break;
  }

  return (
    <div className="p-modal__description">
      <Trans i18nKey={key} ns={ns} context={Version} components={components} values={values} />
    </div>
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
      if (value === undefined) continue;
      this.appendDesc(id, value);
    }
  }

  appendDesc(id: string, value: any) {
    if (value === undefined) return;
    const component = <Desc value={value} />;
    this.insert(id, component);
  }
}