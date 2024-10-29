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
import { getResultData } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import LogDescription from './logDescription';
import JadeBoxes from './parts/jadeBoxes';

function Summary() {
  const { exhibitsConfigs, cardsConfigs } = configsData;
  const { runData, isRunDataLoaded } = useContext(LogContext);
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

  return (
    <section className="p-summary">
      <div className="p-summary__head">
        <div className="p-summary__widgets">
          <ResultWidget resultData={resultData} name={Name} />
          <RequestsWidget requests={Requests} showModal={true} />
          <BaseManasWidget baseMana={BaseMana} />
        </div>
        <div className="p-summary__settings">
          <div className="p-summary__block">
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
          <JadeBoxes />
        </div>
        {Mods !== undefined && <ModsWidget mods={Mods} collapse={true} />}
      </div>
      <LogDescription description={Description} />
      <div className="p-summary__exhibits">
        <div className="p-summary__pivot">
          <h3 className="p-summary__entity">{t('exhibitsCount', { ns: 'log', count: Exhibits.length })}</h3>
          <div className="p-summary__rarities">
            {exhibitRarities.map(rarity => {
              const count = Exhibits.filter(exhibit => exhibitsConfigs.get(exhibit).Rarity === rarity).length;
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
              const count = Cards.filter((card, i) => {
                const { type } = cardsConfigs.get(card);
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