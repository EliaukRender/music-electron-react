import { persistReducer, persistStore } from 'redux-persist';
import { configureStore, Reducer } from '@reduxjs/toolkit';
import globalReducer from '@/renderer/store/modules/globalReducer';
import userReducer from '@/renderer/store/modules/userReducer';
import { userReducerPersisCfg } from '@/renderer/store/persisConfig';
import mainMenuReducer from '@/renderer/store/modules/mainMenuReducer';
import playerControlReducer from '@/renderer/store/modules/playerControlReducer';
import audioPlayerReducer from '@/renderer/store/modules/audioPlayerReducer';
import analyzeReducer from '@/renderer/store/modules/analyzeReducer';

// store
const store = configureStore({
  reducer: {
    global: globalReducer, // 全局公用数据
    mainMenu: mainMenuReducer, // 主菜单数据
    playerControl: playerControlReducer, // 控制栏数据
    audioPlayer: audioPlayerReducer, // 音频播放数据
    analyze: analyzeReducer, // 音频播放数据
    user: persistReducer(userReducerPersisCfg, userReducer) as Reducer, // persistReducer对reducer实现持久化
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Redux Toolkit忽略特定的非序列化值从而兼容redux-persist
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>; // 定义 RootState 类型

export const persistor = persistStore(store); // 持久化后的store
export default store;
