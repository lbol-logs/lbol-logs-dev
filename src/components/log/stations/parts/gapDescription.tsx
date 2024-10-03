import { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TObjAny } from 'utils/types/common';
import { MoneyImage, PowerImage } from './stationWidgets';
import { applyRate } from 'utils/functions/helpers';
import Highlight from '../../parts/highlight';
import { configsData } from 'configs/globals';

function GapDescription({ option, maxhp, children }: { option: string, maxhp?: number, children?: ReactNode }) {
  const { gapConfigs } = configsData;
  useTranslation();

  const props: TObjAny = {};
  const config = gapConfigs.get(option);

  switch(option) {
    case 'DrinkTea':
      {
        const { Rate: rate } = config;
        const Rate = rate * 100;
        const Value = applyRate(maxhp as number, rate);
        props.values = { Rate, Value };
        break;
      }
    case 'DrinkTea_JingzhiChaju':
      const AdditionalHeal = 20;
      props.values = { AdditionalHeal };
      break;
    case 'DrinkTea_DiannaoPeijian':
      const AdditionalPower = 50;
      props.values = { AdditionalPower };
      props.components = { Power: <PowerImage /> };
      break;
    case 'DrinkTea_HuangyouJiqiren':
      const CardCount = 5;
      props.values = { CardCount };
      break;
    case 'UpgradeCard':
      break;
    case 'UpgradeCard_PayForUpgrade':
      const Price = 25;
      props.values = { Price };
      props.components = { Money: <MoneyImage /> };
      break;
    case 'GetMoney':
      {
        const { Value } = config;
        props.values = { Value };
        props.components = { Money: <MoneyImage /> };
        break;
      }
    case 'GetRareCard':
      {
        const { Value } = config;
        props.values = { Value };
        break;
      }
    case 'UpgradeBaota':
      props.components = { h: <Highlight>{}</Highlight> };
      break;
  }

  const desc = `Descriptions.${option}`;

  return (
    <p className="p-gap-choice__desc" key={desc}>
      <Trans
        i18nKey={desc}
        ns="gap"
        {...props}
      />
      {children}
    </p>
  );
}

export default GapDescription;