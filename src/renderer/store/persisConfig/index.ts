import storage from 'redux-persist/lib/storage';

// userReducer持久化配置
export const userReducerPersisCfg = {
  key: 'user',
  storage,
  whitelist: ['token'],
};
