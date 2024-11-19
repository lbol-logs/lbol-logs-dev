import { islatestVersionModsWip, islatestVersionWip, latestVersion, tempVersion } from 'configs/globals';
import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';

function Announcement() {
  const { version } = useContext(CommonContext);

  if (version !== latestVersion) return null;
  if (!islatestVersionWip && !islatestVersionModsWip) return null;

  const array: Array<string> = [];
  if (islatestVersionWip) array.push('vanilla');
  if (islatestVersionModsWip) array.push('mods');
  const wip = array.join(', ');

  return (
    <div className="p-announcement">
      <p className="p-announcement__text">You can upload {tempVersion || version} log now but configs, texts and images are WIP: {wip}</p>
    </div>
  );
}

export default Announcement;