

import React from 'react';
import { FavoriteProvider } from './contexts/Favorite';
import { PageProvider } from './contexts/PageContextStore';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

const App = () => {
  return (
    <FavoriteProvider>
      <PageProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PageProvider>
    </FavoriteProvider>
  );
};

export default App;
