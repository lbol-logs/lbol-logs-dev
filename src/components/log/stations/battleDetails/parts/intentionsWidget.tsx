import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getIntentionImage } from 'utils/functions/getImage';
import { TIntentions, TIntentionWithDamage } from 'utils/types/runData';

function Intention({ type, name, alt }: { type: string, name?: string, alt?: string }) {
  const { t } = useTranslation();

  return <LazyLoadImage2 callback={getIntentionImage} name={name || type} alt={t(`intentions.${alt || type}`, { ns: 'log' })} />;
}

function IntentionsWidget({ intentions }: { intentions: TIntentions }) {
  return (
    <div className="p-intentions">
      {intentions.map((e, i) => {
        const _intention = e as TIntentionWithDamage;
        const { Type, Damage } = _intention;

        let intention;

        if (Damage === undefined) {
          intention = <Intention type={Type} />;
        }
        else {
          const { Times, IsAccurate } = _intention;

          let type = Type;
          const totalDamage = Damage * Times;
          if (totalDamage >= 30) type += '3';
          else if (totalDamage >= 10) type += '2';
          else type += '1';

          const alt = IsAccurate ? 'AttackAccurate' : undefined;

          const icon = (
            <span className={`p-intention__icon ${IsAccurate ? 'p-intention__accurate' : ''}`}>
              <Intention type={Type} name={type} alt={alt} />
            </span>
          );

          let times = null;
          if (Times > 1) {
            times = (
              <>
                <span>x</span>
                <span>{Times}</span>
              </>
            );
          }

          intention = (
            <>
              {icon}
              <div className="p-intention__damage">
                <span>{Damage}</span>
                {times}
              </div>
            </>
          );
        }

        return (
          <div className="p-intention" key={i}>
            {intention}
          </div>
        );
      })}
    </div>
  );
}

export default IntentionsWidget;