import { toggleCheckedClassName } from 'components/top/filters/filter';
import { TObj, TObjAny, TObjElement, TObjString } from 'utils/types/common';
import { TCard, TCardChanges, TCards, TExhibit, TExhibitChange, TExhibitChanges, TExhibitObj, TExhibitObjs, TExhibits, TRunData, TStation, TStations } from 'utils/types/runData';
import { TNodes, TNodeY } from 'utils/types/runData';

function checkForce(Nodes: TNodes) {
  const nodesY: Array<TNodeY> = [];
  Nodes.forEach(({ Y }) => (!nodesY.includes(Y)) && nodesY.push(Y));
  const force = nodesY.length !== 1 || nodesY[0] !== 0;
  return { nodesY, force };
}

function validateRunData(runData: TRunData) {
  if (!Object.keys(runData).length) return false;
  else return true;
}

function copyObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function compareArrays(array1: Array<string>, array2: Array<string>) {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}

function getLength(obj: Object) {
  return Object.keys(obj).length;
}

function toggleIsChecked(isChecked: boolean) {
  return isChecked ? toggleCheckedClassName : '';
}

function isSameStation(station1: TStation, station2: TStation): boolean {
  const { Act, Level } = station1.Node;
  const { Act: act, Level: level } = station2.Node;
  const isCurrentStation = Act === act && Level === level;
  return isCurrentStation;
}

function getCurrentLevel<T extends TCardChanges | TExhibitChanges>(changes: T, stations: TStations, station: TStation): T {
  return (changes as any[]).filter(({ Station }: { Station: number }) => {
    const isCurrentLevel = isSameStation(station, stations[Station]);
    return isCurrentLevel;
  }) as T;
}

function getSameCardIndex(cards: TCards, card: TCard): number {
  return cards.findIndex(({ Id, IsUpgraded, UpgradeCounter }) =>
    Id === card.Id &&
    IsUpgraded === card.IsUpgraded &&
    UpgradeCounter === card.UpgradeCounter
  );
}

function getSameExhibitIndex(exhibits: TExhibitObjs | TExhibits, exhibit: TExhibitObj | TExhibit): number {
  const id = typeof exhibit === 'string' ? exhibit : exhibit.Id;
  if (typeof exhibits[0] === 'string') return exhibits.findIndex(Id => Id === id);
  else return (exhibits as TExhibitObjs).findIndex(({ Id }) => Id === id);
}

function showRandom(runData: TRunData): boolean {
  return runData.Settings.ShowRandomResult;
}

function getNext(next: TObjAny, choices?: Array<number | string>): [Array<string>, Array<number>] {
  let array: Array<string>;
  const invalids: Array<number> = [];
  if (choices) {
    array = choices.map((choice, i) => {
      if (typeof choice === 'string' && choice.endsWith('_invalid')) invalids.push(i);
      return next[choice];
    });
  }
  else {
    array = Object.values(next);
  }
  return [array, invalids];
}

function convertCards(Ids: Array<string>, IsUpgraded: boolean = false): TCards {
  return Ids.map(Id => ({ Id, IsUpgraded }));
}

function applyRate(n: number, rate: number) {
  return Math.round((n as number) * rate);
}

function getExhibitId(exhibit: TExhibit | TExhibitObj | TExhibitChange): string {
  const isExhibit = typeof exhibit === 'string';
  const Id = isExhibit ? exhibit : exhibit.Id;
  return Id;
}

function concatObjects(props: TObjAny, ...objs: Array<TObj<TObjElement | TObjString>>): TObjAny {
  for (const obj of objs) {
    const [key, value] = Object.entries(obj)[0];
    Object.assign(value, props[key]);
    Object.assign(props, { [key]: value });
  }
  return props;
}

export {
  checkForce,
  validateRunData,
  copyObject,
  compareArrays,
  getLength,
  toggleIsChecked,
  getCurrentLevel,
  getSameCardIndex,
  getSameExhibitIndex,
  showRandom,
  getNext,
  convertCards,
  applyRate,
  getExhibitId,
  concatObjects
};