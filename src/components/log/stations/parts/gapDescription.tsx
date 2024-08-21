import { LogContext } from 'contexts/logContext';
import { ReactNode, useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TObjAny } from 'utils/types/common';
import { MoneyWidget, PowerWidget } from './statuses';

function GapDescription({ option, maxhp, children }: { option: string, maxhp?: number, children?: ReactNode }) {
  const { configsData } = useContext(LogContext);
  useTranslation();

  const props: TObjAny = {};
  const config = configsData.gap[option];

  switch(option) {
    case 'DrinkTea':
      {
        const { Rate } = config;
        const Value = Math.round((maxhp as number) * Rate / 100);
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
      props.components = { Power: <PowerWidget /> };
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
      props.components = { Money: <MoneyWidget /> };
      break;
    case 'GetMoney':
      {
        const { Value } = config;
        props.values = { Value };
        props.components = { Money: <MoneyWidget /> };
        break;
      }
    case 'GetRareCard':
      {
        const { Value } = config;
        props.values = { Value };
        break;
      }
    case 'UpgradeBaota':
      props.components = { h: <span className="u-orange">{}</span> };
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
  )
}

export default GapDescription;