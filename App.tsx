import React from 'react';
import { ThemeProvider } from './constants/ThemeContext';
import AppNavigation from './navigation/Navigation';

function App(): React.JSX.Element {

  return (
    <ThemeProvider>
      <AppNavigation/>
    </ThemeProvider>
  );
}

export default App;
