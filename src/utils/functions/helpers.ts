import { toggleCheckedClassName } from 'components/top/filters/filter';
import { TObjAny } from 'utils/types/common';
import { TAct, TCard, TCardChanges, TCards, TExhibit, TExhibitChange, TExhibitChanges, TExhibitObj, TExhibitObjs, TLevel, TRunData, TStations } from 'utils/types/runData';
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

function filterObject<T extends TObjAny>(o: T, callback: Function): T {
  return Object.keys(o)
    .filter(key => callback(o[key]))
    .reduce((_o: TObjAny, key: string) => {
      _o[key] = o[key];
      return _o
    }, {} as T) as T;
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

function getCurrentLevel<T extends TCardChanges | TExhibitChanges>(changes: T, Stations: TStations, act: TAct, level: TLevel): T {
  return (changes as any[]).filter(({ Station }: { Station: number }) => {
    const station = Stations[Station];
    const { Act, Level } = station.Node;
    const isCurrentLevel = Act === act && Level === level;
    return isCurrentLevel;
  }) as T;
}

function getSameCardIndex(cards: TCards, card: TCard): number {
  return cards.findIndex(({ Id, IsUpgraded, UpgradeCounter }) => Id === card.Id && IsUpgraded === card.IsUpgraded && UpgradeCounter === card.UpgradeCounter);
}

function getSameExhibitIndex(exhibits: Array<TExhibitObj | TExhibit>, exhibit: TExhibitObj | TExhibit): number {
  const id = typeof exhibit === 'string' ? exhibit : exhibit.Id;
  if (typeof exhibits[0] === 'string') return exhibits.findIndex(Id => Id === id);
  else return (exhibits as TExhibitObjs).findIndex(({ Id }) => Id === id);
}

function showRandom(runData: TRunData): boolean {
  return runData.Settings.ShowRandomResult;
}

function getNext(next: TObjAny, choices?: Array<number>): Array<string> {
  const array: Array<string> = [];
  for (const [key, { current }] of Object.entries(next)) {
    if (choices) {
      if (choices.includes(Number(key))) array.push(current);
    }
    else {
      array.push(current);
    }
  }
  return array;
}

function convertCard(Id: string, IsUpgraded: boolean = false): TCard {
  return { Id, IsUpgraded };
}

function convertCards(Ids: Array<string>, IsUpgraded: boolean = false): TCards {
  return Ids.map(Id => convertCard(Id, IsUpgraded));
}

function applyRate(n: number, rate: number) {
  return Math.round((n as number) * rate);
}

function getExhibitId(exhibit: TExhibit | TExhibitObj | TExhibitChange): string {
  const isExhibit = typeof exhibit === 'string';
  const Id = isExhibit ? exhibit : exhibit.Id;
  return Id;
}

export {
  checkForce,
  validateRunData,
  copyObject,
  filterObject,
  compareArrays,
  getLength,
  toggleIsChecked,
  getCurrentLevel,
  getSameCardIndex,
  getSameExhibitIndex,
  showRandom,
  getNext,
  convertCard,
  convertCards,
  applyRate,
  getExhibitId
};