import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useMemo } from 'react';
import Home from './views/Home';
import { AppStyles } from '@/renderer/AppStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/renderer/theme/config/lightTheme';
import store, { persistor } from '@/renderer/store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // redux数据

export default function App() {
  // 当前主题配置
  const currentTheme = useMemo(() => {
    return lightTheme;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={currentTheme}>
          <AppStyles>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Router>
          </AppStyles>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
