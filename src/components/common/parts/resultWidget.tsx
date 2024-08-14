import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getResultImage } from 'utils/functions/getImage';
import DateTime from './dateTime';

function ResultWidget({ result }: { result: TResult}) {
  const { t } = useTranslation();
  const { Type, Timestamp, Cards, Exhibits, BaseMana } = result;
  const height = 100;

  return (
    <div className="p-result">
    <LazyLoadImage src={getResultImage(type)} width={} {t(`result.${Type}`, { ns: 'common' })} />
    <DateTime timestamp={Timestamp} />
      <LazyLoadImage class="p-result__background" src={getResultImage('bg')}  width={} height={height} />
    </div>
  );
}

export default ResultTypeWidget;