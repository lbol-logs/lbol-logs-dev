import { toggleCheckedClassName } from 'components/top/filters/filter';
import { configsData, resultTypes } from 'configs/globals';
import { AsideType, TObj, TObjAny, TObjElement, TObjString } from 'utils/types/common';
import { TCardPool, TChoice, TRounds } from 'utils/types/others';
import { TCard, TCardChange, TCardChanges, TCards, TExhibit, TExhibitChange, TExhibitChanges, TExhibitObj, TExhibitObjs, TExhibits, TLevel, TRunData, TStation, TStations } from 'utils/types/runData';
import { TNodes, TNodeY } from 'utils/types/runData';

function checkForce(Nodes: TNodes) {
  const nodesY: Array<TNodeY> = [];
  Nodes.forEach(({ Y }) => (!nodesY.includes(Y)) && nodesY.push(Y));
  const force = nodesY.length !== 1 || nodesY[0] !== 0;
  return { nodesY, force };
}

function validateRunData(runData: TRunData) {
  if (!getLength(runData)) return false;
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
    const _station = getStation(Station);
    const isCurrentLevel = isSameStation(station, stations[_station]);
    return isCurrentLevel;
  }) as T;
}

function getSameCardIndex(cards: TCards, card: TCard, excludes: Array<number> = []): number {
  return cards.findIndex(({ Id, IsUpgraded, UpgradeCounter }, i) =>
    Id === card.Id &&
    IsUpgraded === card.IsUpgraded &&
    UpgradeCounter === card.UpgradeCounter &&
    !excludes.includes(i)
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

function getLogLink(version: string, id: string) {
  return `/${version}/${id}/`;
}

function getResultType(result: string) {
  return resultTypes[result];
}

function getResultData(runData: TRunData) {
  const { Settings, Result } = runData;
  const { Character, PlayerType, Requests, Difficulty } = Settings;
  const { Type, Timestamp, Exhibits } = Result;
  const exhibit = Exhibits[0];
  const resultData = { Character, PlayerType, Type, Timestamp, Difficulty, exhibit, Requests };
  return resultData;
}

function getCleanUrl() {
  const url = [
    window.location.protocol,
    '//',
    window.location.host,
    window.location.pathname].join('');
  return url;
}

function getScrollHeight(level: TLevel, showMap: boolean, rounds: TRounds) {
  let target: HTMLDivElement;
  const station = document.querySelector(`.js-level-${level}`) as HTMLDivElement;
  if (!station) return;

  target = station;
  const selector = showMap ? '.js-map' : '.js-holdings';
  const element = document.querySelector(selector) as HTMLDivElement;

  const { current } = rounds;
  if (current !== undefined && current >= 0) {
    const round = station.querySelector(`.js-round-${current}`) as HTMLDivElement;
    if (round) target = round;
  }

  const height = target.offsetTop - element.offsetHeight;
  return height;
}

function checkRounds(rounds: TRounds) {
  if (!getLength(rounds)) return false;
  else return true;
}

function toggleAside(asideHoldings: AsideType) {
  const { left, right } = AsideType;
  const aside = (asideHoldings === left) ? right : left;
  return aside;
}

function createArray(len: number, callback: (value: any, index?: number) => any) {
  return new Array(len).fill(null).map(callback);
}

function getConfigsKey(name: string) {
  return `${name}Configs`;
}

function checkIsMod(character: string) {
  const { charactersConfigs } = configsData;
  return !charactersConfigs.has(character);
}

function getNs({ ns, character, isMod }: { ns: string, character?: string, isMod?: boolean }): [string, boolean] {
  if (character !== undefined) isMod = checkIsMod(character);
  const _ns = (isMod ? 'mods.' : '') + ns;
  return [_ns, isMod as boolean];
}

function getEntityNs(o: TObjAny): [string, boolean] {
  const [name, entity] = Object.entries(o)[0];
  const ns = name + (name === 'jadeBox' ? 'es' : 's');
  const { Id } = entity;
  const configs = configsData[getConfigsKey(ns)];
  const isMod = !configs.has(Id);
  const [_ns] = getNs({ ns, isMod });
  return [_ns, isMod];
}

function getSpellcardType(spellcard: string) {
  return spellcard.slice(-1);
}

function getOwner(owner: string) {
  return owner || 'Neutral';
}

function getCardPoolLength(cards: TCardPool) {
  return Object.values(cards).flat().length;
}

function scroll() {
  const div = document.querySelector('.js-runList') as HTMLDivElement;
  div.scrollIntoView({ behavior: 'smooth' });
}

function getPatchouliModConfigs(runData: TRunData) {
  return runData.Settings.Mods?.find(({ GUID }) => GUID === 'rmrfmaxx.lbol.PatchouliCharacterMod')?.Configs || { startingExhibitSign: 0, startingCardSign: 0 };
}

function getStation(Station: number) {
  const station = Station === -1 ? 0 : Station;
  return station;
}

function getChangeStation(stations: TStations, change: TCardChange | TExhibitChange) {
  const { Station } = change;
  const station = getStation(Station);
  return stations[station].Node;
}

function getChosen(Choices: Array<number> | null, i: number, choices?: Array<number | string>) {
  let chosen;
  if (Choices) {
    if (!choices) chosen = Choices[i] ;
    else chosen = choices.indexOf(Choices[i]);
  }
  return chosen as TChoice;
}

export {
  checkForce,
  validateRunData,
  copyObject,
  compareArrays,
  getLength,
  toggleIsChecked,
  isSameStation,
  getCurrentLevel,
  getSameCardIndex,
  getSameExhibitIndex,
  showRandom,
  getNext,
  convertCards,
  applyRate,
  getExhibitId,
  concatObjects,
  getLogLink,
  getResultType,
  getResultData,
  getCleanUrl,
  getScrollHeight,
  checkRounds,
  toggleAside,
  createArray,
  getConfigsKey,
  checkIsMod,
  getNs,
  getEntityNs,
  getSpellcardType,
  getOwner,
  getCardPoolLength,
  scroll,
  getPatchouliModConfigs,
  getStation,
  getChangeStation,
  getChosen
};