import { MoneyImage, PowerImage } from '../stations/parts/stationWidgets';
import Highlight, { highlightColors } from 'components/log/parts/highlight';
import { Trans, useTranslation } from 'react-i18next';
import { TCard, TExhibitObj, THolding, TStatusEffect } from 'utils/types/runData';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import CharacterShortName from '../stations/parts/characterShortName';
import CardManasWidget from './cardManasWidget';
import { TObjElement, TObjAny, TObj } from 'utils/types/common';
import BaseManasWidget from 'components/common/parts/baseManasWidget';
import { configsData } from 'configs/globals';
import i18next from 'i18next';
import { getEntityNs, getPatchouliModConfigs } from 'utils/functions/helpers';
import { TJadeBoxObj, TRequestObj } from 'utils/types/others';

function DescriptionWidget({ entityObj, prefix = '' }: { entityObj: TObjAny, prefix?: string }) {
  const { act, level, holdings, runData } = useContext(LogContext);
  const { t, i18n } = useTranslation();

  const isEn = i18next.language === 'en';
  const [ns, isMod] = getEntityNs(entityObj);
  const [entityType, entity] = Object.entries(entityObj)[0];

  const components: TObjElement = {
    Money: <MoneyImage />,
    Power: <PowerImage />,
    PlayerName: <CharacterShortName />
  };
  const c = new Components(components);

  for (const color in highlightColors) components[`h${color}`] = <Highlight color={color}>{}</Highlight>;
  for (const mana of '012WUBRGCP') c.insertManaObj({ [mana]: mana }, 'Mana');
  for (const mana of ['WW']) c.insertManaObj({ [mana]: mana }, 'Mana');

  const values = {};

  let Version;
  const keys: Array<string> = [];

  function addKey(id: string, prefix: string) {
    keys.push(`${id}.${prefix}Description`);
  }

  switch (entityType) {
    case 'card': {
      const card = entity as TCard;
      const {
        Id, IsUpgraded, UpgradeCounter
      } = card;
      const { cardsConfigs } = configsData;
      const config = cardsConfigs.get(card);
      const cardConfigs = config.getAll();

      ({ Version } = cardConfigs);

      if (IsUpgraded) addKey(Id, `Upgraded${prefix}`);
      addKey(Id, prefix);

      // TODO: QingxingMeng.Limit

      const { Damage, Block, Shield, Value1, Value2, Mana, Scry, MoneyCost, ToolPlayableTimes, Power, Graze, StartMana, ActiveMana, TotalMana, Heal, MaxHand, Light, Percentage, PassiveColor, AttackTimes, UpgradeDamage, FreezeTimes } = cardConfigs;

      let damage = Damage;
      if (UpgradeCounter) {
        if (IsUpgraded) damage += (UpgradeCounter + 5) * UpgradeCounter;
      }
      const args = { Damage: damage, Block, Shield, Value1, Value2, Scry, DeckCounter: ToolPlayableTimes, MoneyCost, P: Power, Graze, Heal, MaxHand, Light, Percentage, PassiveColor, AttackTimes, UpgradeDamage, FreezeTimes };
      c.appendDescs(args);
      if (isEn) Object.assign(values, args);
      c.insertManaObj({ Mana });

      c.insert('SelfName', <span className="c-self-name">{t(`${Id}.Name`, { ns })}</span>);
      c.insertManaObj({ StartMana });
      c.insertManaObj({ ActiveMana });
      c.insertManaObj({ TotalMana });

      // Rumia
      {
        if (Id === 'cardtenshaded') {
          const { Value3 } = cardConfigs;
          Object.assign(values, { Value3 });
        }
      }

      // Patchouli
      {
        const { Value3, BoostThreshold1, BoostThreshold2, BoostThreshold3, BonusMana } = cardConfigs;
        const modsArgs = { Value3, BoostThreshold1, BoostThreshold2, BoostThreshold3 };
        c.appendDescs(modsArgs);
        c.insertManaObj({ BonusMana });

        if (Id === 'PatchouliElementalManipulation') {
          const { startingCardSign } = getPatchouliModConfigs(runData);
          Object.assign(values, { Sign: startingCardSign });
        }
      }

      // Sanae
      {
        const { Value3 } = cardConfigs;
        const modsArgs = { Value3 };
        c.appendDescs(modsArgs);
      }

      // Utsuho
      {
        const { SalvoCount, RemoveCount, doubleValue, manatype } = cardConfigs;
        const modsArgs = { SalvoCount, RemoveCount, doubleValue };
        c.appendDescs(modsArgs);
        if (isEn || isMod) Object.assign(values, modsArgs);
        c.insertMana('manatype', manatype);
      }

      // Youmu
      {
        const { ManaEthereal, ManaEmpty, ManaGreen, UnsheathedThreshold1, UnsheathedThreshold2, UnsheathedThreshold3 } = cardConfigs;
        const modsArgs = { UnsheathedThreshold1, UnsheathedThreshold2, UnsheathedThreshold3 };
        c.appendDescs(modsArgs);
        c.insertMana('ManaEthereal', ManaEthereal);
        c.insertMana('ManaEmpty', ManaEmpty);
        c.insertMana('ManaGreen', ManaGreen);
      }

      break;
    }
    case 'exhibit': {
      const { Id, Counter } = entity as TExhibitObj;
      const { exhibitsConfigs } = configsData;
      const config = exhibitsConfigs.get(Id);

      ({ Version } = config);
      addKey(Id, prefix);

      const { Value1, Value2, Value3, Mana, BaseMana, InitialCounter } = config;
      const counter = Counter === undefined ? InitialCounter : Counter;

      const args = { Value1, Value2, Value3, Counter: counter, InitialCounter };
      c.appendDescs(args);
      if (isEn) Object.assign(values, args);
      c.insertManaObj({ Mana });
      if (BaseMana !== undefined) c.insert('BaseMana', <BaseManasWidget baseMana={BaseMana} />);

      // Patchouli
      {
        const { BoostThreshold1 } = config;
        const modsArgs = { BoostThreshold1 };
        c.appendDescs(modsArgs);

        if (Id === 'PatchouliExhibitB') {
          const { startingExhibitSign } = getPatchouliModConfigs(runData);
          Object.assign(values, { Sign: startingExhibitSign });
        }
      }

      break;
    }
    case 'statusEffect': {
      const { Id, Level, Duration, Count, Limit, owner } = entity as TStatusEffect;
      const { statusEffectsConfigs } = configsData;
      const config = statusEffectsConfigs.get(Id);

      ({ Version } = config);
      const { hasExtra, Limit: limit } = config;
      if (hasExtra && Limit === limit) prefix = 'Extra';
      addKey(Id, prefix);

      const isPlayer = [undefined, 'Player'].includes(owner);

      const OwnerName = isPlayer ? <CharacterShortName /> : <>{t(owner as string, { ns: 'units' })}</>;
      c.insertObj({ OwnerName });
      const args = { Level, Duration, Count, Limit: Limit || 0 };
      c.appendDescs(args);
      if (isEn) Object.assign(values, args);

      const { Value, Mana, DamageRate, TriggerLevel, BaseDamage, StackMultiply, SourceCardName, Block, Percentage, MaxHand } = config;

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
      c.insertManaObj({ Mana: mana });

      {
        const StackDamage = StackMultiply === undefined ? undefined : (BaseDamage * StackMultiply);
        const args = { DamageRate, TriggerLevel, BaseDamage, StackMultiply, StackDamage, Block, Percentage, MaxHand };
        c.appendDescs(args);
      }

      if (['ExtraBlizzard', 'ReimuSilenceSe'].includes(Id)) {
        c.insert('Damage', <Desc value={Level} />);
      }
      if (SourceCardName !== undefined) {
        const [ns] = getEntityNs({ card: { Id: SourceCardName } });
        const name = t(`${SourceCardName}.Name`, { ns });
        c.insert('SourceCardName', <Desc value={name} />);
      }
      if (Id === 'MeihongPowerSe') {
        const Heal = Level as number * 2;
        c.insert('Heal', <Desc value={Heal} />);
      }
      if (Id === 'SeeFengshuiSe') {
        c.insert('Scry', <Desc value={Level} />);
      }
      if (Id === 'BailianBlackSe') {
        const mana = Limit === 1 ? 0 : 1;
        c.insertManaObj({ Mana: mana });
      }

      // Rumia
      {
        const { lim, mana } = config;
        const modsArgs = { lim };
        c.appendDescs(modsArgs);
        c.insert('SelfName', <span className="c-self-name">{t(`${Id}.Name`, { ns })}</span>);
        if (mana !== undefined) {
          c.insertManaObj({ mana });
        }
        if (['seadrenaline', 'sebloodyhell', 'setearmedo'].includes(Id)) {
          const atkincrease = Level as number * 5;
          c.appendDescs({ atkincrease });
        }
        if (Id === 'sebloodclot') {
          const Value = Math.min((Level as number || 1) * 5, 100);
          c.appendDescs({ Value });
        }
        if (Id === 'sebloodmark') {
          const Value = (Level as number || 1) * 20;
          c.appendDescs({ Value });
        }
        if (Id === 'setorn') {
          const increase = Level as number * 10;
          c.appendDescs({ increase });
        }
      }

      // Patchouli
      {
        const { BoostThreshold1, BoostThreshold2, BoostThreshold3, BasePassive, BaseActive, Mana } = config;
        const modsArgs = { BoostThreshold1, BoostThreshold2, BoostThreshold3 };
        c.appendDescs(modsArgs);
        if (BasePassive !== undefined) {
          const PassiveAmount = BasePassive * (Level as number);
          c.appendDescs({ PassiveAmount });
        }
        if (BaseActive !== undefined) {
          const ActiveAmount = BaseActive * (Level as number);
          c.appendDescs({ ActiveAmount });
        }
        if (Id === 'PatchouliOneWeekGirlSe') {
          const NextSign = (Count as number + 1) % 7;
          Object.assign(values, { NextSign });
        }
        if (Id === 'PatchouliSatelliteHimawariSe') {
          const BonusDamage = (Level as number) * (Count as number);
          c.appendDescs({ BonusDamage });
        }
        if (Id === 'PatchouliVoileSe') {
          const mana = new Array(Level as number).fill(Mana).join('');
          c.insertManaObj({ Mana: mana });
        }
      }

      // Sanae
      // eslint-disable-next-line no-lone-blocks
      {
        if (!isEn) Object.assign(values, args);
      }

      // Utsuho
      {
        const { manatype, HeatDamageRatio } = config;
        c.insertMana('manatype', manatype);
        if (HeatDamageRatio !== undefined) {
          const HeatDamage = Math.floor(Level as number * HeatDamageRatio);
          c.appendDescs({ HeatDamage });
        }
      }

      break;
    }
    case 'request': {
      const { Id } = entity as TRequestObj;
      const { requestsConfigs } = configsData;
      const config = requestsConfigs.get(Id);

      ({ Version } = config);
      addKey(Id, prefix);

      break;
    }
    case 'jadeBox': {
      const { Id } = entity as TJadeBoxObj;
      const { jadeBoxesConfigs } = configsData;
      const config = jadeBoxesConfigs.get(Id);

      ({ Version } = config);
      addKey(Id, prefix);

      const { Value1, Value2, Value3, Mana } = config;

      const args = { Value1, Value2, Value3 };
      c.appendDescs(args);
      if (isEn) Object.assign(values, args);
      c.insertManaObj({ Mana });

      break;
    }
  }

  let key = keys[0];
  for (let i = 1; i < keys.length; i++) {
    if (!i18n.exists(key, { ns, context: Version })) key = keys[i];
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

  insertManaObj(o: TObj<string | number>, prefix = '') {
    const [id, mana] = Object.entries(o)[0];
    this.insertMana(prefix + id, mana);
  }

  insertMana(id: string, mana: string | number) {
    if (mana === undefined) return;
    this.insert(id, <CardManasWidget cardMana={mana} />);
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