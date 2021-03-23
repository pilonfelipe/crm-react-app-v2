import React, { useContext } from 'react';
import AppRouter from './AppRouter';
import { Box } from '@material-ui/core';
import FullPageLoader from './components/FullPageLoader';
import FullPageLoaderV2 from './v2/components/FullPageLoader';
import AppStateDialog from './v2/containers/AppStateDialog';
import { AppStateContext } from './contexts/AppState';

function App() {
  const { status } = useContext(AppStateContext);

  return (
    <Box
      minHeight='100vh'
      height='100vh'
    >
      {
        status !== 'initiating' && <AppRouter/>
      }
      <FullPageLoader/>
      <FullPageLoaderV2/>
      <AppStateDialog/>
    </Box>
  )
}

export default App;
