import { latestVersion } from 'configs/globals';
import { createContext, useState } from 'react';

type TCommonContext = {
  version: string
  setVersion: React.Dispatch<React.SetStateAction<string>>
};

export const CommonContext = createContext<TCommonContext>({
  version: latestVersion,
  setVersion: () => {}
});

function CommonProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState(latestVersion);
  const value = {
    version,
    setVersion
  };

  return (
    <CommonContext.Provider value={value}>
      {children}
    </CommonContext.Provider>
  );
}

export default CommonProvider;