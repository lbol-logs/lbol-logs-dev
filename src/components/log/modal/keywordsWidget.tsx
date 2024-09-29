import { useTranslation } from "react-i18next";

function KeywordsWidget({ keywords}: { keywords: Array<string> }) {
  const { t } = useTranslation();

  return (
    <div className="p-card__keywords" key="keywords">
      {keywords.map(keyword => {
        return (
          <span className="c-card__keyword">{t(keyword, { ns: 'keywords' })}</span>
        );
      })}
    </div>
  );
}

export default KeywordsWidget;

const notAutoAppend = [
  'GamerunInitial',
  'Basic',
  'Ability',
  'Misfortune',
  'Gadgets',
  'Block',
  'Shield',
  'Philosophy',
  'HybridCost',
  'Upgrade',
  'Power',
  'Debut',
  'Instinct',
  'XCost',
  'Synergy',
  'Scry',
  'Purify',
  'Expel',
  'Morph',
  'TempMorph',
  'Overdrive',
  'Grow',
  'Plentiful',
  'Overdraft',
  'CopyHint',
  'Battlefield',
  'NaturalTurn',
  'FriendCard',
  'Friend',
  'FriendSummoned',
  'Loyalty',
  'Mood',
  'Deploy',
  'Magic',
  'Leave'
];

export {
  notAutoAppend
};