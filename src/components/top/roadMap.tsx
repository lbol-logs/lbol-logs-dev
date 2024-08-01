function RoadMap({ category, array }: { category: string, array: Array<string> }) {
  const key = `c-roadmap-${category}`;
  return (
    <div className={key} key={key}>
      <h3 className={`${key}__title`}>{t(`roadmap.keys.${category}`, { ns: 'common' })}</h3>
      <ul className={`${key}__list`}>
        {array.map((item, i) => {
          return <li className={`${key}__list-item`} key={`${category}${i}`}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default RoadMap;