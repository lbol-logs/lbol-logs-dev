import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { defaultVersion } from 'configs/globals';
import { createContext, useState } from 'react';

import Top from 'components/top';
import Log from 'components/log';

export const VersionContext = createContext({} as {
  version: string
  setVersion: React.Dispatch<React.SetStateAction<string>>
})

function App() {
  const [version, setVersion] = useState(defaultVersion);
  const value = {
    version,
    setVersion
  };

  return (
    <VersionContext.Provider value={value}>
      <BrowserRouter basename="/lbol-logs">
        <Routes>
          <Route path='/' element={<Top />} />
          <Route path='/:ver/' element={<Top />} />
          <Route path='/:ver/:id/' element={<Log />} />
        </Routes>
        <Link to='/'>Back To Top</Link>
      </BrowserRouter>
    </VersionContext.Provider>
  );
}

export default App;
