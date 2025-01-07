import { useRoutes } from 'react-router-dom';
import React, { Suspense, useMemo } from 'react';
import { AppStyles } from '@/renderer/AppStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/renderer/theme/config/lightTheme';
import store, { persistor } from '@/renderer/store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import routes from '@/renderer/router/routes';
import GlobalStyles from '@/renderer/assets/css/globalStyles/GlobalStyles';

export default function App() {
  // 当前主题配置
  const currentTheme = useMemo(() => {
    return lightTheme;
  }, []);

  return (
    /* redux */
    <Provider store={store}>
      {/* 持久化redux */}
      <PersistGate loading={null} persistor={persistor}>
        {/* app主题 */}
        <ThemeProvider theme={currentTheme}>
          {/* 全局css样式 */}
          <GlobalStyles></GlobalStyles>
          {/* hash路由，通过异步组件包括，避免组件懒加载导致的报错 */}
          <Suspense>
            <AppStyles>{useRoutes(routes)}</AppStyles>
          </Suspense>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
