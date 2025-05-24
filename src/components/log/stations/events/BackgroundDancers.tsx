import { TStation } from 'utils/types/runData';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import useBackgroundDancers from 'hooks/useBackgroundDancers';

function BackgroundDancers({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  const id = Id as string;
  const eventConfigs = eventsConfigs.get(id);
  const configs = dialoguesConfigs.get(id);

  const dialogues = useBackgroundDancers({ id, Data, configs, eventConfigs });

  if (!Data) return null;

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} />
          <div className="p-event__body">
            <div className="p-dialogues">
              {dialogues}
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default BackgroundDancers;