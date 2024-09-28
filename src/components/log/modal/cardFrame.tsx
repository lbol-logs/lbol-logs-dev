import { getCardFrameImage } from 'utils/functions/getImage';
import { Image2x } from './cardModal';
import { TObjAny } from 'utils/types/common';

function CardFrame({ configs }: { configs: TObjAny }) {
  const { Type, Rarity, Colors } = configs;

  let main;
  let sub = null;
  let color;

  if (['Tool', 'Misfortune'].includes(Type)) color = Type;
  else if (Colors === undefined) color = 'C';
  else if (Colors.length >= 3) color = 'Rainbow';
  else {
    color = Colors[0];
    sub = getFrame('c-card-frame__sub', Colors[1]);
  }
  main = getFrame('c-card-frame__main', color);

  function getFrame(className: string, color: string) {
    const name = `${Rarity}/${color}`;
    const frame = <Frame className={className} name={name} />;
    return frame;
  }

  return (
    <div className="p-card__frame">
      {sub}
      {main}
    </div>
  );
}

export default CardFrame;

function Frame({ name, className }: { name: string, className: string }) {
  return (
    <Image2x className={className} callback={getCardFrameImage} name={name} width="512" height="714" />
  );
}