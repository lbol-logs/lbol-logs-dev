import ExternalLink from 'components/common/parts/externalLink';
import { whitelistDomains } from 'configs/globals';
import { useTranslation } from 'react-i18next';

function LogDescription({ description }: { description: string | undefined }) {
  const { t } = useTranslation();

  if (description === undefined) return null;

  const regExp = new RegExp(`(?:${whitelistDomains.join('|')})\\S*`, 'g');

  function replace(string: string, urls: Array<string>, i: number) {
    const url = urls[i];
    const [before, after] = string.split(url);
    let _after: JSX.Element;
    const next = i + 1;
    if (next === urls.length) _after = <>{after}</>;
    else _after = replace(after, urls, next);
    const inner: JSX.Element = (
      <>
        {before}
        <ExternalLink className="p-description__link" href={url}>{url}</ExternalLink>
        {_after}
      </>
    );
    return inner;
  }

  return (
    <div className="p-description">
      <h3 className="p-description__head">{t('description', { ns: 'log' })}</h3>
      {description.split('\n').map((line, i) => {
        const urls = line.match(regExp);
        let inner: JSX.Element;
        if (urls) {
          inner = replace(line, urls, 0);
        }
        else {
          inner = <>{line}</>;
        }

        return (
          <p className="p-description__line" key={i}>
            {inner}
          </p>
        );
      })}
    </div>
  );
}

export default LogDescription;