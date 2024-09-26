import Loading from 'components/common/layouts/loading';
import { LogContext } from 'contexts/logContext';
import { useContext, useEffect } from 'react';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import { useTranslation } from 'react-i18next';
import BaseManasWidget from 'components/common/parts/baseManasWidget';
import RequestsWidget from 'components/common/parts/requestsWidget';
import ResultWidget from 'components/common/parts/resultWidget';
import ShowRandomResultWidget from './parts/showRandomResultWidget';
import IsAutoSeedWidget from './parts/isAutoSeedWidget';
import ReloadTimesWidget from './parts/reloadTimesWidget';
import ModsWidget from './parts/modsWidget';
import { getResultData, isMisfortune } from 'utils/functions/helpers';
import { CommonContext } from 'contexts/commonContext';

function Summary() {
  const { configsData: { exhibits: exhibitConfigs } } = useContext(CommonContext);
  const { runData, isRunDataLoaded, configsData: { cards: cardConfigs } } = useContext(LogContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isRunDataLoaded) return;
    window.scrollTo(0, 0);
  }, []);

  if (!isRunDataLoaded) return <Loading />;

  const { Version, Name, Settings, Result, Description } = runData;
  const { Requests, ShowRandomResult, IsAutoSeed, Mods } = Settings;
  const { Cards, Exhibits, BaseMana, Seed, ReloadTimes } = Result;
  const resultData = getResultData(runData);

  const exhibitRarities = ["Mythic", "Shining", "Rare", "Uncommon", "Common"];
  const cardRarities = ["Rare", "Uncommon", "Common", "Misfortune"];

  let description = null;
  if (Description) {
    description = (
      <div className="p-description">
        <h3 className="p-summary__description">{t('description', { ns: 'log' })}</h3>
        {Description.split('\n').map((e, i) => {
          return (
            <p className="p-description__line" key={i}>{e}</p>
          );
        })}
      </div>
    );
  }

  return (
    <section className="p-summary">
      <div className="p-summary__head">
        <div className="p-summary__widgets">
          <ResultWidget resultData={resultData} name={Name} />
          <RequestsWidget requests={Requests} />
          <BaseManasWidget baseMana={BaseMana} />
        </div>
        <div className="p-summary__settings">
          <div className="p-summary__line">
            {Seed !== undefined && <span className="p-summary__seed">{Seed}</span>}
            <IsAutoSeedWidget is={IsAutoSeed} />
          </div>
          <div className="p-summary__line">
            <span className="p-summary__version">{Version}</span>
            <ShowRandomResultWidget show={ShowRandomResult} />
            {ReloadTimes !== undefined && <ReloadTimesWidget count={ReloadTimes} />}
          </div>
        </div>
        {Mods !== undefined && <ModsWidget mods={Mods} />}
      </div>
      {description}
      <div className="p-summary__exhibits">
        <div className="p-summary__pivot">
          <h3 className="p-summary__entity">{t('exhibitsCount', { ns: 'log', count: Exhibits.length })}</h3>
          <div className="p-summary__rarities">
            {exhibitRarities.map(rarity => {
              const count = Exhibits.filter(exhibit => exhibitConfigs[exhibit].Rarity === rarity).length;
              if (!count) return null;

              return (
                <span className={`p-summary__rarity p-summary__rarity--${rarity}`} key={rarity}>
                  {t(`rarities.${rarity}`, { ns: 'log' })}
                  {t('delimiter', { ns: 'log' })}
                  {count}
                </span>
              );
            })}
          </div>
        </div>
        <ExhibitCards exhibits={Exhibits} />
      </div>
      <div className="p-summary__cards">
        <div className="p-summary__pivot">
          <h3 className="p-summary__entity">{t('cardsCount', { ns: 'log', count: Cards.length })}</h3>
          <div className="p-summary__rarities">
            {cardRarities.map(rarity => {
              const count = Cards.filter(({ Id }) => {
                const { Rarity, Type } = cardConfigs[Id];
                const type = isMisfortune(Type) ? Type : Rarity;
                return type === rarity;
              }).length;
              if (!count) return null;

              return (
                <span className={`p-summary__rarity p-summary__rarity--${rarity}`} key={rarity}>
                  {t(`rarities.${rarity}`, { ns: 'log' })}
                  {t('delimiter', { ns: 'log' })}
                  {count}
                </span>
              );
            })}
          </div>
        </div>
        <CardCards cards={Cards} />
      </div>
    </section>
  );
}

export default Summary;