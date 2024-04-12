import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline, Grid } from '@mui/material';

import { StoreContext, TreeViewStore } from './stores/TreeViewStore';
import Sidebar from './components/Sidebar';

function App() {
  const treeViewStore = new TreeViewStore();

  return (
    <>
      <CssBaseline />
        <Grid container >
          <Grid item xs={12} md={4} component="nav">
            <StoreContext.Provider value={treeViewStore}>
              <Sidebar />
            </StoreContext.Provider>
          </Grid>
          <Grid item xs={12} md={8} component="main">
              Documentation
          </Grid>
        </Grid>
    </>
  );
}

export default App
