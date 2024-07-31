import { latestVersion } from "configs/globals";
import { createContext, useState } from "react";

type IVersionContent = {
  version: string
  setVersion: React.Dispatch<React.SetStateAction<string>>
};

export const VersionContext = createContext<IVersionContent>({
  version: latestVersion,
  setVersion: () => {}
});

function VersionProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState(latestVersion);
  const value = {
    version,
    setVersion
  };

  return (
    <VersionContext.Provider value={value}>
      {children}
    </VersionContext.Provider>
  );
}

export default VersionProvider;