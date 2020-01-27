import { configureStore, getDefaultMiddleware, Store } from 'redux-starter-kit';

import rootReducer from './AppReducers';

const store: Store = configureStore({
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: rootReducer,
});

export { store };
