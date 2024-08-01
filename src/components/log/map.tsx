import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

function Map() {
  const { t } = useTranslation();
  const { runData } = useContext(LogContext);

  const size = 40;
  const padding = 8;
  const length = 24;
  const diagonal = 32;
  const width = 2;

  const svg = (
    <svg>
      <line
    x1="98"
    y1="792"
    x2="98"
    y2="768"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="222"
    y1="792"
    x2="254"
    y2="768"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="366"
    y1="792"
    x2="334"
    y2="768"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="378"
    y1="792"
    x2="378"
    y2="768"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="86"
    y1="736"
    x2="54"
    y2="712"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="266"
    y1="736"
    x2="266"
    y2="712"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="310"
    y1="736"
    x2="278"
    y2="712"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="322"
    y1="736"
    x2="322"
    y2="712"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="366"
    y1="736"
    x2="334"
    y2="712"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="54"
    y1="680"
    x2="86"
    y2="656"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="266"
    y1="680"
    x2="266"
    y2="656"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="310"
    y1="680"
    x2="278"
    y2="656"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
  <line
    x1="322"
    y1="680"
    x2="322"
    y2="656"
    stroke="white"
    stroke-dasharray="6 3"
    stroke-width="2"
  ></line>
</svg>
  );

  return (
    <section className="p-map">
      <h2 className="p-map__title">{t('map', { ns: 'log' })}</h2>
      <div className="p-map__map">
        {svg}
      </div>
    </section>
  );
}

export default Map;