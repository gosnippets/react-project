// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// import rootReducer from './reducers';

// const loggerMiddleware = createLogger();

// export const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     thunkMiddleware,
//     loggerMiddleware
//   )
// );

// export type RootStore = ReturnType<typeof rootReducer>

import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, loggerMiddleware]
})

export type RootStore = ReturnType<typeof rootReducer>